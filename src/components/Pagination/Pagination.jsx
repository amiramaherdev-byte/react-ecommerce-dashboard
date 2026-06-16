import React from "react";
import { Col, Row, Button } from "react-bootstrap";
const Pagination = ({ currentPage, loading, setCurrentPage, totalPages }) => {
  return (
    <Row>
      <Col className="d-flex justify-content-center mt-2 flex-wrap">
        <Button
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? "green" : "gray",
              margin: "3px",
            }}
          >
            {index + 1}
          </Button>
        ))}

        {/* {          Array.from({ length: 5 }, (item, index) => console.log(item, index))
} */}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </Col>
    </Row>
  );
};

export default Pagination;
