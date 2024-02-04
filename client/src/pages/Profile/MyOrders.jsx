import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import Message from "../../components/Message";
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
  useTheme,
} from "@mui/material";
import Loader from "../../components/Loader";

const StyledShopNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const MyOrders = () => {
  const theme = useTheme();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <section style={{ marginTop: "5rem" }}>
      <Typography
        variant="h1"
        color={theme.palette.secondary.main}
        fontWeight={700}
        mb={"2rem"}
        sx={{ fontSize: "1.5rem" }}
      >
        Shopping Cart
      </Typography>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <TableContainer component={Paper}>
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
                    {order.orderItems.length} item in total
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
                    <StyledShopNowButton
                      variant="contained"
                      component={Link}
                      to={`/order/${order._id}`}
                    >
                      Details
                    </StyledShopNowButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        //   <tbody>
        //     {orders.map((order) => (
        //       <tr key={order._id}>
        //         <td>{order._id}</td>
        //         <td>{order.createdAt.substring(0, 10)}</td>
        //         <td>${order.totalPrice}</td>
        //         <td>
        //           {order.isPaid ? (
        //             order.paidAt.substring(0, 10)
        //           ) : (
        //             <FaTimes style={{ color: "red" }}></FaTimes>
        //           )}
        //         </td>
        //         <td>
        //           {order.isdelivered ? (
        //             order.deliveredAt.substring(0, 10)
        //           ) : (
        //             <FaTimes style={{ color: "red" }}></FaTimes>
        //           )}
        //         </td>
        //         <td>
        //           <Link to={`/order/${order._id}`}>
        //             <button>Details</button>
        //           </Link>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
      )}
    </section>
  );
};
export default MyOrders;
