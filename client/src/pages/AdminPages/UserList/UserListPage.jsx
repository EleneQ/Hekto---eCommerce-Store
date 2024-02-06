import {
  Alert,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Loader from "../../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../slices/usersApiSlice";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const StyledTableCellNames = styled(TableCell)(({ theme }) => ({
  color: theme.palette.pink.main,
  fontWeight: "700",
}));

const UserListPage = () => {
  const theme = useTheme();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container component={"section"} maxWidth={false} sx={{ mt: "2.5rem" }}>
      <Typography
        variant="h1"
        fontWeight={700}
        fontSize={"1.5rem"}
        mb={"1rem"}
        color="secondary.main"
      >
        Users
      </Typography>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 400 }} aria-label="user list">
            <TableHead>
              <TableRow>
                <StyledTableCellNames>Id</StyledTableCellNames>
                <StyledTableCellNames align="right">Name</StyledTableCellNames>
                <StyledTableCellNames align="right">Email</StyledTableCellNames>
                <StyledTableCellNames align="right">Admin</StyledTableCellNames>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      color={theme.palette.secondary.main}
                      // component={Link}
                      // to={`admin/user/${user._id}`}
                      // sx={{ textDecoration: "none" }}
                    >
                      {user.name}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      component={"a"}
                      href={`mailto:${user.email}`}
                      color={theme.palette.secondary.main}
                    >
                      {user.email}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {user.isAdmin ? (
                      <CheckIcon
                        style={{ color: "green", fontSize: "1.2rem" }}
                      />
                    ) : (
                      <ClearIcon
                        sx={{
                          color: theme.palette.secondary.main,
                          fontSize: "1.2rem",
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() => deleteHandler(user._id)}
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: "1.2rem",
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
export default UserListPage;
