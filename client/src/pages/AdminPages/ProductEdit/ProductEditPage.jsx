import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from "../../../slices/productsApiSlice";
import Container from "../../../components/styles/Container.styled";

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([{ colorName: "white", value: "#fff" }]);
  const [countInStock, setCountInStock] = useState(0);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brands,
        colors,
        categories,
        countInStock,
        description,
      }).unwrap();

      toast.success("Product updated successfully");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.desc);
      setColors(product.colors);
      setCountInStock(product.countInStock);
      setCategories(product.categories);
      setBrands(product.brands);
    }
  }, [product]);

  const productColorsUpdateHandler = (e, index) => {
    const { name, value } = e.target;

    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = { ...updatedColors[index], [name]: value };

      return updatedColors;
    });
  };

  return (
    <section>
      <Container>
        <h1>Edit Product</h1>
        <div>
          {loadingUpdate && <Loader />}

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              {/* IMAGE GOES HERE */}

              <label htmlFor="countInStock">
                Count In Stock
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </label>

              {/** TODO: CHANGE THIS FOR BETTER CATEGORY ADDITION */}
              <div>
                <h2>Categories:</h2>

                {categories.map((category, index) => (
                  <label key={index} htmlFor={`category${index}`}>
                    Category #{index + 1}
                    <input
                      type="text"
                      name={`category${index}`}
                      id={`category${index}`}
                      placeholder="Enter category"
                      value={categories[index]}
                      onChange={(e) =>
                        setCategories((prevCategories) => {
                          const updatedCategories = [...prevCategories];
                          updatedCategories[index] = e.target.value;

                          return updatedCategories;
                        })
                      }
                    />
                  </label>
                ))}
              </div>

              <label htmlFor="description">
                Description
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div>
                <h2>Colors:</h2>

                {colors.map((color, index) => (
                  <div key={index}>
                    <label htmlFor={`colorName${index}`}>
                      Color #{index + 1} Name
                      <input
                        type="text"
                        name={`colorName${index}`}
                        id={`colorName${index}`}
                        placeholder="Enter Color Name"
                        value={color.colorName}
                        onChange={(e) => productColorsUpdateHandler(e, index)}
                      />
                    </label>
                    <label htmlFor={`colorValue${index}`}>
                      Color #{index + 1} Value
                      <input
                        type="text"
                        name={`colorValue${index}`}
                        id={`colorValue${index}`}
                        placeholder="Enter Color Value"
                        value={color.value}
                        onChange={(e) => productColorsUpdateHandler(e, index)}
                      />
                    </label>
                  </div>
                ))}

                {/** TODO: CHANGE THIS FOR BETTER BRAND ADDITION */}
                <div>
                  <h2>Brands:</h2>

                  {brands.map((brand, index) => (
                    <label key={index} htmlFor={`brand${index}`}>
                      Brand #{index + 1}
                      <input
                        type="text"
                        name={`brand${index}`}
                        id={`brand${index}`}
                        placeholder="Enter Brand"
                        value={brands[index]}
                        onChange={(e) =>
                          setBrands((prevBrands) => {
                            const updatedBrands = [...prevBrands];
                            updatedBrands[index] = e.target.value;

                            return updatedBrands;
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>

              <button>Update</button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};
export default ProductEditPage;
