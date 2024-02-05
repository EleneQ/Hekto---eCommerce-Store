import { Link } from "react-router-dom";
import {
  Button,
  Container,
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
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useGetOrdersQuery } from "../../../slices/ordersApiSlice";
import ClearIcon from "@mui/icons-material/Clear";

const StyledTableCellNames = styled(TableCell)(({ theme }) => ({
  color: theme.palette.pink.main,
  fontWeight: "700",
}));

const StyledDetaulsButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const OrderList = () => {
  const theme = useTheme();
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <Container component={"section"} maxWidth={false} sx={{ mt: "2.5rem" }}>
      <Typography
        variant="h1"
        fontWeight={700}
        fontSize={"1.5rem"}
        mb={"1rem"}
        color={theme.palette.secondary.main}
      >
        Orders
      </Typography>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 400 }} aria-label="user list">
            <TableHead>
              <TableRow>
                <StyledTableCellNames>Id</StyledTableCellNames>
                <StyledTableCellNames align="right">User</StyledTableCellNames>
                <StyledTableCellNames align="right">Date</StyledTableCellNames>
                <StyledTableCellNames align="right">Total</StyledTableCellNames>
                <StyledTableCellNames align="right">Paid</StyledTableCellNames>
                <StyledTableCellNames align="right">
                  Delivered
                </StyledTableCellNames>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>

                  <TableCell align="right">
                    {order.user && order.user.name}
                  </TableCell>

                  <TableCell align="right">
                    {order.createdAt.substring(0, 10)}
                  </TableCell>

                  <TableCell align="right">${order.totalPrice}</TableCell>

                  <TableCell align="right">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <ClearIcon
                        style={{ color: theme.palette.secondary.main }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <ClearIcon
                        style={{ color: theme.palette.secondary.main }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <StyledDetaulsButton
                      variant="contained"
                      component={Link}
                      to={`/order/${order._id}`}
                    >
                      Details
                    </StyledDetaulsButton>
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
export default OrderList;
