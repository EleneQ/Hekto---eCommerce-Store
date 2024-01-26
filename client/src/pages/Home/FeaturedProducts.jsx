import Container from "../../components/styles/Container.styled";
import { productExamples } from "../../constants/data";
import {
  ProductList,
  ProductStyled,
  ImageContainer,
  ProductName,
  ProductColors,
  ProductColor,
} from "./styles/FeaturedProducts.styled";
import SectionHeading from "../../components/styles/SectionHeading.styled";

const FeaturedProducts = () => {
  return (
    <section style={{ textAlign: "center" }}>
      <Container>
        <SectionHeading>Featured Products</SectionHeading>
        <ProductList>
          {productExamples?.map((product) => (
            <ProductStyled>
              <ImageContainer>
                <img src={product.image} alt={product.name} />
              </ImageContainer>
              <div style={{ padding: "1rem" }}>
                <ProductName>{product.name}</ProductName>
                <ProductColors>
                  {product.colors.map((color) => (
                    <ProductColor style={{ backgroundColor: color.value }} />
                  ))}
                </ProductColors>
                <p>Code: {product.code}</p>
                <p>${product.price}</p>
              </div>
            </ProductStyled>
          ))}
        </ProductList>
      </Container>
    </section>
  );
};
export default FeaturedProducts;
