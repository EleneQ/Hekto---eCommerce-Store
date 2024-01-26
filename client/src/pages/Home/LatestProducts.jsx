import { useState } from "react";
import SectionHeading from "../../components/styles/SectionHeading.styled";
import Container from "../../components/styles/Container.styled";
import { CategoryList } from "./styles/LatestProducts.styled";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

export const categories = [
  { title: "New Arrival", value: "new" },
  { title: "Best Seller", value: "best" },
  { title: "Special Offer", value: "special" },
];

const LatestProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("new");
  const { data: products, isLoading, error } = useGetProductsQuery();

  //TODO: CHANGE THIS TO FETCH ONLY THE FEATURED PRODUCTS!!!
  // useEffect(() => {
  //   let data: Product[] = [];

  //   switch (selectedCategory) {
  //     case "new":
  //       data = productExamples;
  //       break;
  //     case "best":
  //       data = [...productExamples].sort((a, b) => b.sales - a.sales);
  //       break;
  //     case "special":
  //       data = productExamples.filter((product) => product.discount);
  //       break;
  //     default:
  //       data = productExamples;
  //   }
  //   setProducts(data.slice(0, 6));
  // }, [selectedCategory]);

  return (
    <section>
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <>
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
              {products?.map((product) => (
                <li>
                  <img src={product.image} alt={product.name} />
                  <p>${product.price}</p>
                  {product.discount && <p>On Sale</p>}
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
};
export default LatestProducts;
