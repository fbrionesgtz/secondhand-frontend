import { useNavigate, useParams } from "react-router-dom";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";

const ProductDetailsPage = (props) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const hanldeEditProduct = (prodId, action) => {
    navigate(`/${action}-product/${prodId}`);
  };

  return (
    <ProductDetails productId={productId} onEditProduct={hanldeEditProduct} />
  );
};

export default ProductDetailsPage;
