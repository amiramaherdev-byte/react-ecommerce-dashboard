import { Form, Row, Col } from "react-bootstrap";
import SearchInput from "../Search/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { setProductSearch } from "../../features/products/productsSlice";
import { useState } from "react";

const ProductControls = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
  localSearch,
  setLocalSearch
}) => {

  return (
    <Row className="mb-3">
      <Col md={4}>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={4}>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="rating">Rating</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </Form.Select>
      </Col>
        <Form className="mt-4">
   <SearchInput
  value={localSearch}
  onChange={(val) => setLocalSearch(val)}
  placeholder="Search Products..."
/>
        </Form>
    </Row>
  );
};

export default ProductControls;
