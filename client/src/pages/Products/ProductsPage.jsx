import { Link, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Container from "../../components/styles/Container.styled";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import ProductFilters from "./ProductFilter";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "new",
    p: 1,
  });

  const params = {
    page: searchParams.get("p") || 1,
    limit: 8,
    keyword: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "",
    rating: searchParams.get("rating") || 0,
    brands: searchParams.get("brands") || [],
    discount: searchParams.get("discount") || 0,
    colors: searchParams.get("colors") || [],
  };

  const { data, isLoading, error } = useGetProductsQuery(params);

  return (
    <section style={{ textAlign: "center" }}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : !data ? (
          <Message>No products found</Message>
        ) : (
          <>
            <ProductFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />

            <ul>
              {data.products &&
                data.products.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <li>
                      <div>
                        <img src={`${product.image}`} alt={product.name} />
                      </div>
                      <div style={{ padding: "1rem" }}>
                        <p>{product.name}</p>
                        <ul>
                          {product.colors.map((color, index) => (
                            <li
                              key={index}
                              style={{ backgroundColor: color.value }}
                            />
                          ))}
                        </ul>
                        <p>Code: {product.code}</p>
                        <p>${product.price}</p>
                      </div>
                    </li>
                  </Link>
                ))}
            </ul>

            <Paginate
              pages={data.pages}
              currentPageNum={data.page}
              setSearchParams={setSearchParams}
            />
          </>
        )}
      </Container>
    </section>
  );
};

export default ProductsPage;
