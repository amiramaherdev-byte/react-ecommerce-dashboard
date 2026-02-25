import { Col, Container, Row, Spinner } from "react-bootstrap";
import ProductCard from "../../components/Products/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import useProducts from "../../hooks/useProducts";
import ProductControls from "../../components/Products/ProductControls";
const ProductList = ({ search }) => {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    category,
    setCategory,
    sortBy,
    setSortBy,
  } = useProducts(search);

  return (
    <Container className="mt-4">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <ProductControls
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <Row xs={1} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default ProductList;
