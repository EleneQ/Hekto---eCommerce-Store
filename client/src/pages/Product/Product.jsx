import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "../../components/styles/Container.styled";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  ProductStyled,
  Image,
  PoductColors,
  ColorsList,
  AddToCartButton,
} from "./styles/Product.styled";
import Rating from "../../components/Rating";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";
import { addToCart } from "../../slices/cartSlice";

const Product = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
    }
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <section>
          <Container>
            <ProductStyled>
              <div>
                <Image src={`/${product.image}`} alt={product.name} />
              </div>
              <div>
                <div>
                  <p>{product.price}</p>
                  {product.discount && product.discount !== 0 && (
                    <p>
                      {calcDiscountedPrice(product.price, product.discount)}
                    </p>
                  )}
                </div>

                <p>{product.name}</p>
                <Rating
                  value={product.rating}
                  text={`(${product.numReviews} reviews)`}
                />
                <PoductColors>
                  <p>{product.colors.length === 1 ? "Color:" : "Colors:"}</p>
                  <ColorsList>
                    {product.colors.map((color) => (
                      <li style={{ backgroundColor: `${color.value}` }}></li>
                    ))}
                  </ColorsList>
                </PoductColors>
                <div>
                  <p>Categories</p>
                  <ul>
                    {product.categories.map((category) => (
                      <li>{category}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stick"}
                </p>

                {product.countInStock > 0 && (
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    max={product.countInStock}
                    onChange={(e) => setQty(Number(e.target.value))}
                    onBlur={() => {
                      if (qty > product.countInStock) {
                        setQty(product.countInStock);
                      }
                    }}
                  />
                )}

                <AddToCartButton
                  className={product.countInStock > 0 ? "" : "out-of-stock"}
                  onClick={
                    product.countInStock > 0 ? addToCartHandler : undefined
                  }
                >
                  Add To Cart
                </AddToCartButton>
              </div>
            </ProductStyled>
          </Container>
        </section>
      )}
    </>
  );
};
export default Product;
