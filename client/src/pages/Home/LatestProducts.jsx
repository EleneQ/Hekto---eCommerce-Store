import { useState } from "react";
import SectionHeading from "../../components/styles/SectionHeading.styled";
import Container from "../../components/styles/Container.styled";
import { CategoryList } from "./styles/LatestProducts.styled";
import { productExamples } from "../../constants/data";

export const categories = [
  { title: "New Arrival", value: "new" },
  { title: "Best Seller", value: "best" },
  { title: "Special Offer", value: "special" },
];

const LatestProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("new");

  return (
    <section>
      <Container>
        <SectionHeading>Latest Products</SectionHeading>
        <CategoryList>
          {categories.map((category) => (
            <li
              style={{
                color: category.value === selectedCategory ? "red" : "",
              }}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.title}
            </li>
          ))}
        </CategoryList>
        <ul style={{ display: "flex", textAlign: "center" }}>
          {productExamples?.map((product) => (
            <li>
              <img src={product.image} alt={product.name} />
              <p>${product.price}</p>
              {product.discount && <p>On Sale</p>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
export default LatestProducts;
