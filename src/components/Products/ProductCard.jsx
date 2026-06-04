import React from "react";
import { Button, Card, Badge, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  deleteLocalProduct,
} from "../../features/products/productsSlice";
import "./products.css";
import { toast } from "react-toastify";
import { addToCart } from "../../features/carts/cartSlice";

const ProductCard = ({ product, onEdit, loggedInUser }) => {
  const dispatch = useDispatch();
  const handleDelete = async (product) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      if (product.isLocal) {
        dispatch(deleteLocalProduct(product.id));
        toast.success("Local product deleted");
      } else {
        await dispatch(deleteProduct(product.id)).unwrap();
        toast.success("Product deleted successfully");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
      console.error(err);
    }
  };

  const handleAdd = () => {
    if (!loggedInUser) {
      toast.error("please login first");
    }

    if (!product.id || !product.title || product.price == null) {
      console.error("Product missing required fields!", product);
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1, // default quantity
        image: product.images?.[0] || "", // optional
      }),
    );
  };

  return (
    <Card className="h-100 shadow-sm border-0 d-flex flex-column">
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Img
          variant="top"
          src={product.images?.[0]}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6 fw-bold card-title">
            {product.title}
          </Card.Title>

          <Card.Text className="card-text">
            {product.description.slice(0, 60)}...
          </Card.Text>

          <h5 className="text-primary">${product.price}</h5>
        </Card.Body>
      </Link>

      <Card.Body>
        {/* tags */}
        <div className="mb-3 mt-auto tags-container">
          <div className="mb-3 mt-auto tags-container">
            {Array.isArray(product.tags) &&
              product.tags.slice(0, 3).map((tag, index) => (
                <Badge bg="secondary" className="me-1" key={index}>
                  {tag}
                </Badge>
              ))}
          </div>
        </div>

        {/* buttons */}
        {loggedInUser?.role === "admin" && (
          <div className="d-flex gap-2 mt-auto justify-content-between">
            <Button
              variant="outline-warning"
              size="sm"
              className="w-100"
              onClick={onEdit}
            >
              Edit
            </Button>

            <Button
              variant="outline-danger"
              size="sm"
              className="w-100"
              onClick={() => handleDelete(product)}
            >
              Delete
            </Button>
          </div>
        )}

        <div className="d-flex gap-2 mt-auto justify-content-between">
          <Button
            variant="outline-primary"
            size="sm"
            className="w-100 mt-1"
            onClick={handleAdd}
          >
            Add to card
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
