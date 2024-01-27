import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Container from "../../../components/styles/Container.styled";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = (productId) => {};

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section>
      <Container>
        <h1>Products</h1>

        <button onClick={createProductHandler}>
          <FaEdit /> Create Product
        </button>

        {loadingCreate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Colors</th>
                  <th>Categories</th>
                  <th>Brand(s)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>
                      {product.colors.map((color) => (
                        <p>{color.colorName}</p>
                      ))}
                    </td>
                    <td>
                      {product.categories.map((category) => (
                        <p>{category}</p>
                      ))}
                    </td>
                    <td>
                      {product.brands.map((brand) => (
                        <p>{brand}</p>
                      ))}
                    </td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
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
