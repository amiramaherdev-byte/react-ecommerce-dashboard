import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/Products/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import ProductControls from "../../components/Products/ProductControls";
import CustomModal from "../../components/UI/CustomModal";

import { fetchProducts } from "../../features/products/productsSlice";
import ProductForm from "../../components/Products/ProductForm";
import { toast } from "react-toastify";

const ProductList = () => {

  const dispatch = useDispatch();
  const {  total, status, error , currentPage, products,search } = useSelector(
    (state) => state.products,
  );

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);



  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [productToEdit, setProductToEdit] = useState(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);

  // debounce search

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

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
          err.response?.data?.message || err.message || "Failed to fetch products",
        );
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch, debouncedSearch, category, sortBy, currentPage]);

  return (
    <Container className="mt-4">
      {/* Loading */}
      {status === "loading" ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Products</h4>
            <Button variant="primary" onClick={openModal}>
              + Add Product
            </Button>
          </div>

          {/* Filters */}
          <ProductControls
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Product Grid */}
          <Row xs={1} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard
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
        // setCurrentPage={setCurrentPage}
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
          currentSearch={debouncedSearch}
          currentCategory={category}
          currentSort={sortBy}
          currentPage={currentPage}
          setProductToEdit={setProductToEdit}
          resetPage={() => setCurrentPage(1)}
          title={productToEdit ? "Edit Product" : "Add New Product"}
        />
      </CustomModal>
    </Container>
  );
};

export default ProductList;
