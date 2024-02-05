import Message from "../../../components/Message";
import {
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
    <Container component={"section"} maxWidth={false}>
      <Typography
        variant="h1"
        fontWeight={700}
        fontSize={"1.3rem"}
        mb={"2rem"}
        color={theme.palette.secondary.main}
      >
        Users
      </Typography>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Admin</TableCell>
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
                      <ClearIcon sx={{ color: "red", fontSize: "1.2rem" }} />
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
