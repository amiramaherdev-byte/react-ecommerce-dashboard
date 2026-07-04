import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  updateLocalProduct,
} from "../../features/products/productsSlice";
import { toast } from "react-toastify";
import TagsInput from "./TagsInput";

const ProductForm = ({ setShowModal, productToEdit, setProductToEdit }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);

  const [title, setTitle] = useState(productToEdit?.title || "");
  const [price, setPrice] = useState(productToEdit?.price || "");
  const [description, setDescription] = useState(
    productToEdit?.description || "",
  );
  const [tags, setTags] = useState(
    Array.isArray(productToEdit?.tags) ? productToEdit.tags : [],
  );

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title || "");
      setPrice(productToEdit.price || "");
      setDescription(productToEdit.description || "");
      setTags(productToEdit.tags || []);
    } else {
      resetForm();
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: parseFloat(price),
      description,
      tags: tags,
      images: productToEdit?.images || [
        "https://dummyimage.com/150x150/ccc/000&text=Product",
      ],
    };

    try {
      if (productToEdit) {
        if (productToEdit.id > 100) {
          if (productToEdit.isLocal) {
            dispatch(
              updateLocalProduct({ id: productToEdit.id, data: productData }),
            );
          }
          toast.success("Product updated locally");
        } else {
          await dispatch(
            updateProduct({ id: productToEdit.id, data: productData }),
          ).unwrap();

          toast.success("Product updated successfully");
        }
      } else {
        await dispatch(createProduct(productData)).unwrap();
        toast.success("New product added successfully");
      }

      setShowModal(false);
      setProductToEdit(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
      if (import.meta.env.DEV) {
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setTags([]);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h3>{productToEdit ? "Edit Product" : "Add New Product"}</h3>

          {error && toast.error({ error })}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <TagsInput tags={tags} setTags={setTags} />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  {productToEdit ? "Updating..." : "Adding..."}
                </>
              ) : productToEdit ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
