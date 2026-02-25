import { Form, Row, Col } from "react-bootstrap";
import useCategory from "../../hooks/useCategory";

const ProductControls = ({ category, setCategory, sortBy, setSortBy }) => {
  const { categories } = useCategory();

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
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ProductControls;
