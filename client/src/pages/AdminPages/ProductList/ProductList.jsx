import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../../slices/productsApiSlice";
import { Alert, Button, IconButton, Typography, styled } from "@mui/material";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const StyledShopNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.6rem 0.8rem",
  marginBottom: "1rem",
}));

const ProductList = () => {
  const { data, refetch, isLoading, error } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    try {
      await createProduct();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const headerClassName = "tableHeader";
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName,
    },
    { field: "name", headerName: "Name", width: 180, headerClassName },
    { field: "price", headerName: "Price", width: 100, headerClassName },
    { field: "colors", headerName: "Colors", width: 150, headerClassName },
    {
      field: "categories",
      headerName: "Categories",
      width: 150,
      headerClassName,
    },
    { field: "brands", headerName: "Brands", width: 160, headerClassName },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton
            component={Link}
            to={`/admin/product/${params.row.id}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteHandler(params.row.id)}
            sx={{ fontSize: "1.2rem" }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ),
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      sortable: false,
    },
  ];

  let rows = [];
  if (data && data.products) {
    rows = data.products.map((product) => ({
      id: product._id,
      name: product.name,
      price: `$${product.price}`,
      colors: product.colors
        .map((color) => capitalizeFirstLetter(color.colorName))
        .join(", "),
      categories: product.categories
        .map((category) => capitalizeFirstLetter(category))
        .join(", "),
      brands: product.brands
        .map((brand) => capitalizeFirstLetter(brand))
        .join(", "),
    }));
  }

  return (
    <div>
      <Typography
        variant="h1"
        fontWeight={700}
        fontSize={"1.5rem"}
        mb={"1rem"}
        color="secondary.main"
      >
        Products
      </Typography>
      <StyledShopNowButton
        onClick={createProductHandler}
        endIcon={<EditIcon />}
      >
        Create Product
      </StyledShopNowButton>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <div style={{ height: 450, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              sx={{
                pt: "0.5rem",
                boxShadow: 2,
                border: 3,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "pink.main",
                },
                "& .tableHeader": {
                  color: "pink.main",
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ProductList;
