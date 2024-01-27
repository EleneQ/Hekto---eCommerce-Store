import { Link } from "react-router-dom";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Container from "../../../components/styles/Container.styled";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useGetProductsQuery } from "../../../slices/productsApiSlice";

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const deleteHandler = (productId) => {};

  return (
    <section>
      <Container>
        <h1>Products</h1>

        <button>
          <FaEdit /> Create Product
        </button>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND(S)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      {product.brands.map((brand) => (
                        <p>{brand}</p>
                      ))}
                    </td>
                    <td>
                      <Link to={`/admin/product/${product._id}`}>
                        <button>
                          <FaEdit />
                        </button>
                      </Link>
                      <button onClick={() => deleteHandler(product._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </Container>
    </section>
  );
};
export default ProductList;
