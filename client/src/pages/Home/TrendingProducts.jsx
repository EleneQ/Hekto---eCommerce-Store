import SectionHeading from "../../components/styles/SectionHeading.styled";
import Container from "../../components/styles/Container.styled";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const TrendingProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();


  //TODO: CHANGE THIS TO FETCH ONLY THE FEATURED PRODUCTS!!!
  // useEffect(() => {
  //   const data: Product[] = [...productExamples].sort(
  //     (a, b) => b.views - a.views
  //   );
  //   setProducts(data.slice(0, 6));
  // }, []);

  return (
    <section>
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <SectionHeading>Trending Products</SectionHeading>
            <ul style={{ display: "flex", textAlign: "center" }}>
              {products.map((product) => (
                <li>
                  <img src={product.image} alt={product.name} />
                  <p>${product.price}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
};

export default TrendingProducts;
