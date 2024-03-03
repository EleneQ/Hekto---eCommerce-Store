import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { Clear } from "@mui/icons-material";
import {
  Button,
  styled,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
} from "@mui/material";
import Loader from "../../components/Loader";

const StyledDetailsButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const MyOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <section style={{ marginTop: "4.5rem" }}>
      <Typography
        variant="h1"
        color="secondary.main"
        fontWeight={700}
        mb={"2rem"}
        sx={{ fontSize: "1.5rem" }}
      >
        Orders
      </Typography>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error?.data?.message || error.error}</Alert>
      ) : (
        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Number of items</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Paid</TableCell>
                <TableCell align="right">Delivered</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    ({order.orderItems.length}) item in total
                  </TableCell>
                  <TableCell align="right">
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">${order.totalPrice}</TableCell>
                  <TableCell align="right">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Clear sx={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {order.isdelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <Clear sx={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <StyledDetailsButton
                      variant="contained"
                      component={Link}
                      to={`/order/${order._id}`}
                    >
                      Details
                    </StyledDetailsButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
};
export default MyOrders;
