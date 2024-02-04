import Loader from "../../components/Loader";
import { useCreateReviewMutation } from "../../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const StyledReviewButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.pink.main,
  "&:hover": {
    backgroundColor: theme.palette.pink.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
  textTransform: "capitalize",
  marginTop: "1rem",
  width: "100%",
}));

const Reviews = ({ product, refetch }) => {
  const theme = useTheme();
  const { id: productId } = useParams();

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch(); //no stale data
      toast.success("Review added successfully");
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box component={"section"}>
      <div>
        <Typography
          variant="h3"
          color={theme.palette.secondary.main}
          fontSize={"1.2rem"}
          fontWeight={700}
          gutterBottom
        >
          Create a review:
        </Typography>

        {loadingProductReview && <Loader />}

        <form onSubmit={submitHandler}>
          <Stack
            direction={{ sx: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            spacing={5}
          >
            <Paper
              elevation={2}
              component={TextField}
              placeholder="Write a review"
              multiline
              name="comment"
              id="comment"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Stack
              direction={"column"}
              alignItems={{ sm: "center" }}
              sx={{ mt: { xs: "1rem", sm: "0" } }}
            >
              <Paper elevation={2} sx={{ width: "140px" }}>
                <FormControl fullWidth>
                  <InputLabel id="rating">Select Rating</InputLabel>
                  <Select
                    variant="outlined"
                    labelId="rating"
                    id="rating"
                    label="Select Rating"
                    value={rating}
                    required
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </Paper>

              {userInfo ? (
                <StyledReviewButton
                  type="submit"
                  disabled={loadingProductReview}
                >
                  Submit Review
                </StyledReviewButton>
              ) : (
                <Typography>
                  Please <Link to="/login">sign in</Link> to write a review
                </Typography>
              )}
            </Stack>
          </Stack>
        </form>
      </div>

      <Divider sx={{ maxWidth: "550px", my: "1rem" }} />

      <div>
        <Typography
          variant="h2"
          color={theme.palette.secondary.main}
          fontWeight={700}
          fontSize={"1.4rem"}
          gutterBottom
        >
          Reviews:
        </Typography>

        {product.reviews.length <= 0 ? (
          <Typography
            variant="body2"
            fontSize={"0.9rem"}
            color={theme.palette.secondary.main}
          >
            No real user reviews
          </Typography>
        ) : (
          <List>
            {product.reviews.map((review) => (
              <ListItem
                key={review._id}
                sx={{
                  display: "block",
                  p: "0",
                  width: { sx: "200px", sm: "600px", md: "800px" },
                  mb: product.reviews.length > 1 ? "1.5rem" : "",
                }}
              >
                <Typography
                  variant="h5"
                  color={theme.palette.secondary.main}
                  fontSize={"1rem"}
                >
                  {review.name}
                </Typography>

                <Stack
                  direction={"row"}
                  spacing={3}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: "0.4rem" }}
                >
                  <Rating value={review.rating} readOnly />

                  <Typography
                    variant="body1"
                    color={theme.palette.secondary.main}
                    gutterBottom
                  >
                    {review.createdAt.substring(0, 10)}
                  </Typography>
                </Stack>

                <Typography
                  component={Paper}
                  elevation={4}
                  variant="body1"
                  color={theme.palette.secondary.main}
                  sx={{ p: "1rem" }}
                >
                  {review.comment}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Box>
  );
};
export default Reviews;
