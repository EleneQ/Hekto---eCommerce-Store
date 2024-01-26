import SectionHeading from "../../components/styles/SectionHeading.styled";
import Container from "../../components/styles/Container.styled";
import { productExamples } from "../../constants/data";

const TrendingProducts = () => {
  return (
    <section>
      <Container>
        <SectionHeading>Trending Products</SectionHeading>
        <ul style={{ display: "flex", textAlign: "center" }}>
          {productExamples?.map((product) => (
            <li>
              <img src={product.image} alt={product.name} />
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default TrendingProducts;
