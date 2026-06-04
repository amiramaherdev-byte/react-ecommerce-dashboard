import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/Products/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import ProductControls from "../../components/Products/ProductControls";
import CustomModal from "../../components/UI/CustomModal";

import {
  fetchProducts,
  getCategories,
  setCurrentPage,
} from "../../features/products/productsSlice";
import ProductForm from "../../components/Products/ProductForm";
import { toast } from "react-toastify";
import { FaBoxOpen } from "react-icons/fa";

const ProductList = ({ loggedInUser }) => {
  const dispatch = useDispatch();
  const { total, status, error, currentPage, products, search, categories } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
const [localSearch, setLocalSearch] = useState(search || "");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productToEdit, setProductToEdit] = useState(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);

  // debounce search

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(localSearch);
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchProducts({
            search: debouncedSearch,
            category,
            sortBy,
            currentPage,
          }),
        ).unwrap();
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch products",
        );
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch, debouncedSearch, category, sortBy, currentPage]);

  return (
    <Container>
      <div
        className="topbar text-white px-4 py-3 mb-4 rounded-4 shadow"
        style={{
          background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
        }}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "50px", height: "50px" }}
            >
              <FaBoxOpen size={22} />
            </div>

            <div>
              <h3 className="mb-0 fw-bold">Products</h3>
              <p className="mb-0 text-light opacity-75">
                Manage your products and inventory
              </p>
            </div>
          </div>

          {loggedInUser?.role === "admin" && (
            <Button
              variant="light"
              className="fw-semibold px-4 py-2 rounded-3"
              onClick={openModal}
            >
              + Add Product
            </Button>
          )}
        </div>
      </div>
      {/* Loading */}
      {status === "loading" ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {/* Filters */}
          <ProductControls
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            localSearch={localSearch}
            setLocalSearch={setLocalSearch}
          />

          {/* Product Grid */}
          <Row xs={1} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard
                  loggedInUser={loggedInUser}
                  product={product}
                  productToEdit={productToEdit}
                  setProductToEdit={setProductToEdit}
                  tags={Array.isArray(product.tags) ? product.tags : []}
                  onEdit={() => {
                    setProductToEdit(product);
                    openModal();
                  }}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={status === "loading"}
        setCurrentPage={(page) => dispatch(setCurrentPage(page))}
      />

      <CustomModal
        show={showModal}
        title={productToEdit ? "Edit Product" : "Add New Product"}
        handleClose={() => {
          closeModal();
          setProductToEdit(null);
        }}
      >
        <ProductForm
          setShowModal={setShowModal}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
        />
      </CustomModal>
    </Container>
  );
};

export default ProductList;
