import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../../slices/productsApiSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { red } from "@mui/material/colors";

const StyledUpdateButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
}));

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([{ colorName: "", value: "" }]);
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

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImageUrl(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image: imageUrl,
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

  const updateItemAtIndex = (e, index, setter) => {
    setter((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = e.target.value;

      return updatedItems;
    });
  };

  const deleteItemAtIndex = (index, setter) => {
    setter((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);

      return updatedItems;
    });
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.image);
      setDescription(product.desc);
      setColors(product.colors);
      setCountInStock(product.countInStock);
      setCategories(product.categories);
      setBrands(product.brands);
    }
  }, [product]);

  const colorsUpdateHandler = (e, index, field) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];

      updatedColors[index] = {
        ...updatedColors[index],
        [field]: e.target.value,
      };

      return updatedColors;
    });
  };

  const deleteColor = (index) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors.splice(index, 1);

      return updatedColors;
    });
  };

  return (
    <Container component={"section"} maxWidth={false} sx={{ mt: "3.5rem" }}>
      {loadingUpdate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper
          component="form"
          onSubmit={submitHandler}
          elevation={5}
          sx={{ maxWidth: 620, p: "2.5rem", mx: "auto" }}
        >
          <Typography
            variant="h2"
            color="secondary.main"
            fontWeight={700}
            textAlign={"center"}
          >
            Edit Product
          </Typography>

          {/* NAME */}
          <TextField
            name="name"
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            autoFocus
            color="info"
            sx={{ mt: "1rem" }}
          />

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={5}
            mt={"1.5rem"}
          >
            {/* COUNT IN STOCK */}
            <TextField
              name="countInStock"
              id="countInStock"
              type="number"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              label="Count In Stock"
              color="info"
              sx={{ flex: 1 }}
              inputProps={{ min: 0 }}
            />

            {/* PRICE */}
            <TextField
              name="price"
              id="price"
              color="info"
              type={"number"}
              value={price}
              label="Price"
              placeholder="Enter Price"
              inputProps={{ min: 0, step: 0.01 }}
              sx={{ flex: 1 }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Stack>

          {/* DESCRIPTION */}
          <TextField
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            fullWidth
            color="info"
            sx={{ mt: "1.5rem" }}
          >
            {product.desc}
          </TextField>

          {/* IMAGE UPLOAD */}
          <div style={{ marginTop: "1.5rem" }}>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder="Enter image URL"
              hidden
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <Button
              disabled={loadingUpload}
              variant="contained"
              component="label"
              color="secondary"
              endIcon={<AddPhotoAlternateRoundedIcon />}
              sx={{
                textTransform: "capitalize",
                fontSize: "0.9rem",
                p: "0.6rem",
              }}
            >
              Upload Image
              <input type="file" hidden onChange={uploadFileHandler} />
            </Button>
          </div>

          {/* CATEGORIES */}
          <Accordion sx={{ mt: "1.5rem" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Product Categories
            </AccordionSummary>
            <AccordionDetails>
              {categories.map((category, index) => (
                <TextField
                  key={`category-${index}`}
                  label={`Category #${index + 1}`}
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => updateItemAtIndex(e, index, setCategories)}
                  type="text"
                  name={`categoryValue-${index}`}
                  id={`categoryValue-${index}`}
                  fullWidth
                  required
                  color="info"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        position="end"
                        onClick={() => deleteItemAtIndex(index, setCategories)}
                        sx={{ fontSize: "1rem", color: red[500] }}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    mb: index !== categories.length - 1 ? "1.5rem" : "0.5rem",
                  }}
                />
              ))}

              <IconButton
                color="secondary"
                sx={{ fontSize: "1.5rem" }}
                onClick={() => setCategories((prev) => [...prev, ""])}
              >
                <AddCircleRoundedIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>

          {/* BRANDS */}
          <Accordion sx={{ mt: "1.5rem" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Product Brands
            </AccordionSummary>
            <AccordionDetails>
              {brands.map((brand, index) => (
                <TextField
                  key={`brand-${index}`}
                  label={`Brand #${index + 1}`}
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => updateItemAtIndex(e, index, setBrands)}
                  type="text"
                  name={`brandValue-${index}`}
                  id={`brandValue-${index}`}
                  fullWidth
                  required
                  color="info"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        position="end"
                        onClick={() => deleteItemAtIndex(index, setBrands)}
                        sx={{ fontSize: "1rem", color: red[500] }}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    mb: index !== brands.length - 1 ? "1.5rem" : "0.5rem",
                  }}
                />
              ))}

              <IconButton
                color="secondary"
                sx={{ fontSize: "1.5rem" }}
                onClick={() => setBrands((prev) => [...prev, ""])}
              >
                <AddCircleRoundedIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>

          {/* COLORS */}
          <Accordion sx={{ mt: "1.5rem" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Product Colors
            </AccordionSummary>
            <AccordionDetails>
              {colors.map((color, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                  mb={index !== colors.length - 1 ? "1.5rem" : "0.5rem"}
                >
                  <TextField
                    label={`Color #${index + 1} Name`}
                    placeholder="Enter Color Name"
                    value={color.colorName}
                    onChange={(e) => colorsUpdateHandler(e, index, "colorName")}
                    required
                    type="text"
                    name={`colorValue-${index}`}
                    id={`colorValue-${index}`}
                    color="info"
                  />

                  <TextField
                    label={`Color #${index + 1} Value`}
                    placeholder="Enter Color Value"
                    value={color.value}
                    onChange={(e) => colorsUpdateHandler(e, index, "value")}
                    required
                    type="text"
                    name={`colorValue-${index}`}
                    id={`colorValue-${index}`}
                    color="info"
                  />

                  <IconButton
                    position="end"
                    onClick={() => deleteColor(index)}
                    sx={{ fontSize: "1rem", color: red[500] }}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Stack>
              ))}

              <IconButton
                color="secondary"
                sx={{ fontSize: "1.5rem" }}
                onClick={() =>
                  setColors((prevColors) => [
                    ...prevColors,
                    { colorName: "", value: "" },
                  ])
                }
              >
                <AddCircleRoundedIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>

          <StyledUpdateButton disabled={loadingUpdate} type="submit" fullWidth>
            Update Product
          </StyledUpdateButton>
        </Paper>
      )}
    </Container>
  );
};
export default ProductEditPage;
