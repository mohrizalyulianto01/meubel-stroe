import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const FormProducts = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    summary: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    category_id: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(location.state?.product);

  useEffect(() => {
    if (isEditing) {
      setProduct(location.state.product);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(
        `http://localhost:5000/api/v1/product/${product.id}`,
        product
      );
    } else {
      await axios.post("http://localhost:5000/api/v1/product", product);
    }
    navigate("/admin/products");
  };

  return (
    <Container>
      <Card className="text-bg-dark border border-secondary fm-2">
        <Card.Header className="border-bottom border-secondary">
          {isEditing ? "Edit Product" : "Add Product"}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row lg="3" md="2" xs="1" className="g-3 mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option>-- Select Category --</option>
                    <option value="Bed">Bed</option>
                    <option value="Chair">Chair</option>
                    <option value="Sofa">Sofa</option>
                    <option value="Lamps">Lamps</option>
                    <option value="Wardrobe">Wardrobe</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="12" lg="8">
                <Form.Group>
                  <Form.Label>Summary</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Summary"
                    value={product.summary}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col lg="12" md="12">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    rows={4}
                    value={product.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setProduct({ ...product, image: e.target.files[0] })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" size="sm" className="me-2"
              onClick={()=>navigate("/admin/products")}
            >
              <i className="ri-arrow-left-line"></i> Back
            </Button>
            <Button type="reset" variant="danger" size="sm" className="me-2">
              <i className="ri-repeat-line"></i> Reset
            </Button>
            <Button type="submit" variant="success" size="sm">
              <i className="ri-add-line"></i> Save Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormProducts;
