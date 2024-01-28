import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/styles/Container.styled";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../slices/productsApiSlice";
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
import { toast } from "react-toastify";

const Product = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
    }
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch(); //no stale data
      toast.success("Review added successfully");
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
                <Image src={`${product.image}`} alt={product.name} />
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

              <div>
                <h2>Reviews</h2>

                {product.reviews.length === 0 && <Message>No Reviews</Message>}

                <ul>
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <h3>{review.name}</h3>

                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>

                <div>
                  <h2>Create a review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <label htmlFor="rating">
                        Rating
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </label>
                      <label htmlFor="comment">
                        Comment
                        <textarea
                          name="comment"
                          id="comment"
                          row={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </label>
                      <button disabled={loadingProductReview}>Submit</button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </div>
              </div>
            </ProductStyled>
          </Container>
        </section>
      )}
    </>
  );
};
export default Product;
