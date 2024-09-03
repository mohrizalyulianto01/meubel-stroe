import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const FormCustomers = () => {
  const [customer, setCustomer] = useState({
    id: "",
    role: "",
    name: "",
    // phone: "",
    email: "",
    // gender: "",
    // birthdate: "",
    // city: "",
    // address: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(location.state?.customer);

  useEffect(() => {
    if (isEditing) {
      setCustomer(location.state.customer);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(
        `http://localhost:5000/api/v1/auth/users/${customer.id}`,
        customer
      );
    } else {
      await axios.post("http://localhost:5000/api/v1/auth/users", customer);
    }
    navigate("/admin/customers");
  };
  return (
    <Container>
      <Card className="text-bg-dark border border-secondary fm-2">
        <Card.Header className="border-bottom border-secondary">
          {isEditing ? "Edit Customer" : "Add Customer"}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row lg="3" md="2" xs="1" className="g-3 mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Customer Name"
                    value={customer.role}
                    readOnly
                    className="bg-secondary-subtle"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>No. Telp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    value={customer.stock}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select value={customer.gender} onChange={handleChange}>
                    <option>-- Select Gender --</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Form.Group>
              </Col> */}
              {/* <Col>
                <Form.Group>
                  <Form.Label>Birthdate</Form.Label>
                  <Form.Control
                    type="date"
                    value={customer.birthdate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col> */}
              {/* <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Customer city"
                    value={customer.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col> */}
              {/* <Col lg="12" md="12">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Customer Address"
                    rows={4}
                    value={customer.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col> */}
              {/* <Col>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setCustomer({ ...customer, image: e.target.files[0] })
                    }
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={() => navigate("/admin/customers")}
            >
              <i className="ri-arrow-left-line"></i> Back
            </Button>
            <Button type="reset" variant="danger" size="sm" className="me-2">
              <i className="ri-repeat-line"></i> Reset
            </Button>
            <Button type="submit" variant="success" size="sm">
              <i className="ri-add-line"></i> Save Customer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormCustomers;
