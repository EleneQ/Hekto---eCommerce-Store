import SectionHeading from "../../components/styles/SectionHeading.styled";
import Container from "../../components/styles/Container.styled";
import { categories } from "../../constants/data";

const TopCategories = () => {
  return (
    <section>
      <Container>
        <SectionHeading>Top Categories</SectionHeading>
        <ul>
          {categories.map((category) => (
            <li>
              <img src={category.image} alt={category.value} />
              <p>{category.title}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
export default TopCategories;
