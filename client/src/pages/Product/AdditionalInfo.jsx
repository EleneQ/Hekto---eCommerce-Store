import { useState } from "react";
import {
  Alert,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Reviews from "./Reviews";
import Loader from "../../components/Loader";

const AdditionalInfo = ({ product, loadingProduct, errorProduct, refetch }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("description");

  const handleChange = (e, newValue) => {
    setSelectedTab(newValue.toLowerCase());
  };

  return (
    <Box
      component={"section"}
      bgcolor={theme.palette.primary.main}
      mt={"5rem"}
      py="3rem"
    >
      <Container maxWidth={false}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{ mb: "2rem" }}
        >
          <Tab value="description" label="Description" sx={{ pl: "0" }} />
          <Tab value="reviews" label="Reviews" />
        </Tabs>

        {selectedTab === "description" && (
          <Typography
            variant="body1"
            textTransform={"capitalize"}
            color={theme.palette.secondary.main}
          >
            {loadingProduct ? (
              <Loader />
            ) : errorProduct ? (
              <Alert severity="error">
                {errorProduct?.data?.message || errorProduct.error}
              </Alert>
            ) : (
              product.desc
            )}
          </Typography>
        )}

        {selectedTab === "reviews" && (
          <Reviews product={product} refetch={refetch} />
        )}
      </Container>
    </Box>
  );
};
export default AdditionalInfo;
