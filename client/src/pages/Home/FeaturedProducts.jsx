import { useParams } from "react-router-dom";
import Container from "../../components/styles/Container.styled";
import {
  ProductList,
  ProductStyled,
  ImageContainer,
  ProductName,
  ProductColors,
  ProductColor,
} from "./styles/FeaturedProducts.styled";
import SectionHeading from "../../components/styles/SectionHeading.styled";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  //TODO: CHANGE THIS TO FETCH ONLY THE FEATURED PRODUCTS!!!
  // useEffect(() => {
  //   const getFeaturedProducts = () => {
  //     const data = productExamples.filter((product) => product.featured);
  //     setFeaturedProducts(data);
  //   };
  //   getFeaturedProducts();

  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setFeaturedProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  // if (error) {
  //   if ("status" in error) {
  //     const errMsg =
  //       "error" in error ? error.error : JSON.stringify(error.data);

  //     return (
  //       <div>
  //         <div>An error has occurred:</div>
  //         <div>{errMsg}</div>
  //       </div>
  //     );
  //   } else {
  //     return <div>{error.message}</div>;
  //   }
  // }

  return (
    <section style={{ textAlign: "center" }}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <SectionHeading>Featured Products</SectionHeading>
            <ProductList>
              {data.products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <ProductStyled>
                    <ImageContainer>
                      <img src={`${product.image}`} alt={product.name} />
                    </ImageContainer>
                    <div style={{ padding: "1rem" }}>
                      <ProductName>{product.name}</ProductName>
                      <ProductColors>
                        {product.colors.map((color) => (
                          <ProductColor
                            style={{ backgroundColor: color.value }}
                          />
                        ))}
                      </ProductColors>
                      <p>Code: {product.code}</p>
                      <p>${product.price}</p>
                    </div>
                  </ProductStyled>
                </Link>
              ))}
            </ProductList>
            
            <Paginate pages={data.pages} currentPage={data.page} />
          </>
        )}
      </Container>
    </section>
  );
};
export default FeaturedProducts;
