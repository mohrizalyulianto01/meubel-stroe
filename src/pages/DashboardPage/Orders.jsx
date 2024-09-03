import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/order");
    setOrders(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/order/${id}`);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Container className="fm-2">
      <div className="title mb-3">
        <Row xs="2" md="2" className="g-2 align-items-center w-100">
          <Col lg="8">
            <h3 className="card-title">Data Orders</h3>
          </Col>
          <Col lg="4" xs="12" className="order-last order-md-0">
            <div className="d-flex">
              <input
                type="text"
                className="form-control form-control-sm rounded-end-0"
                placeholder="search Customer Orders ..."
              />
              <Button
                variant="warning"
                className="input-group-text rounded-start-0"
                size="sm"
              >
                <i className="ri-search-line"></i>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row xs="2" md="3" lg="4" className="g-1">
        {orders.length === 0 ? (
          <Col md="12" className="w-100 h-100 p-5">
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="fw-semibold fst-italic fs-6">
                There is no orders data yet
              </h3>
            </div>
          </Col>
        ) : (
          orders.map((order) => (
            <Col key={order.id}>
              <Card className="position-relative">
                <Image
                  src="https://via.placeholder.com/300x300"
                  alt=""
                  className="mx-auto w-100 object-fit-cover"
                  style={{ maxHeight: "150px" }}
                />
                <Card.Header className="fw-semibold">{order.name}</Card.Header>
                <Card.Body>
                  <Card.Text>Order id: {order.id}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`edit/${order.id}`)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleDelete}>
                    Delete
                  </Button>
                </Card.Footer>
                <div className="position-absolute top-0 end-0 p-1">
                  <Button className="rounded-circle py-0 px-1" size="sm">
                    <i className="ri-information-line"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Orders;
