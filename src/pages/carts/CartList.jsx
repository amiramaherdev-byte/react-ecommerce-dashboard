import { Col, Container, Row, Spinner } from "react-bootstrap";
import CartCard from "../../components/Carts/CartCard";
import useCarts from "../../hooks/useCarts";

const CartList = () => {
  const {
    carts,
    loading,
    paginatedCarts,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useCarts();

  return (
    <Container className="mt-4">
      {loading ? (
        <Spinner />
      ) : carts.length === 0 ? (
        <p>no cards found</p>
      ) : (
        <Row>
          {paginatedCarts?.map((cart) => (
            <Col key={cart.id} xs={12} sm={6} md={4} className="mb-4 d-flex">
              <CartCard cart={cart} />
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-between my-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {/* <span>
          Page {currentPage} of {Math.ceil(carts.length / cardsPerPage)}
        </span> */}

        {/* <span>
          Page {currentPage} of {Math.ceil(totalCards / cardsPerPage)}
        </span>  */}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default CartList;
