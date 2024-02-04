import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Product from "./Product";
import AdditionalInfo from "./AdditionalInfo";

const ProductPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading: loadingProduct,
    refetch,
    error: errorProduct,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      <Product
        product={product}
        loadingProduct={loadingProduct}
        errorProduct={errorProduct}
      />
      <AdditionalInfo
        product={product}
        loadingProduct={loadingProduct}
        errorProduct={errorProduct}
        refetch={refetch}
      />
    </>
  );
};
export default ProductPage;
