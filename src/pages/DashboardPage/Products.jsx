import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Card,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/Dashboard.css"

const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const Products = () => {
  const [show, setShow] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const APIUrl = "http://localhost:5000"

  const fetchProducts = async () => {
    try {
      const response = await axios.get(APIUrl + "/api/v1/product");
      setDataProducts(response.data.data); // Access the 'data' property from the response
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products.");
    }
  };

    const handleDelete = async (id) => {
      try {
        await axios.delete(APIUrl + `/api/v1/product/${id}`, selectedProduct);
        toast.success("Successfully deleted product");
        fetchProducts();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete product.");
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
  };
  return (
    <Container>
      <div className="table-responsive overflow-x-auto fm-2">
        <div className="card text-bg-dark border border-secondary">
          <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
            <Row xs="2" md="3" className="g-2 align-items-center w-100">
              <Col lg="4">
                <h3 className="card-title">Data Products</h3>
              </Col>
              <Col lg="4" xs="12" className="order-last order-md-0">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-end-0"
                    placeholder="search products ..."
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
              <Col lg="4" className="text-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`add`)}
                >
                  Add Product
                </Button>
              </Col>
            </Row>
          </div>
          <div className="card-body border-top border-secondary table-responsive">
            <Table
              striped
              bordered
              hover
              className="table-dark p-3 text-center"
            >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={APIUrl + product.image}
                        alt={product.name}
                        className="img-thumbnail"
                        width="75"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{formatToIDR(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleShow(product)}
                        >
                          <i className="ri-eye-line"></i>
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() =>
                            navigate(`edit/${product.id}`, {
                              state: { product },
                            })
                          }
                        >
                          <i className="ri-edit-box-line"></i>
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <Modal show={show} onHide={handleClose} className="fm-2">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="border-0">
              <Card.Img
                src={APIUrl + selectedProduct.image}
                className="w-50 d-block mx-auto"
              />
              <div className="border border-secondary-subtle mt-3 ">
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <span className="fw-semibold me-2">Harga:</span>
                    {formatToIDR(selectedProduct.price)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="fw-semibold me-2">Category:</span>
                    {selectedProduct.category}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="fw-semibold me-2">Stock:</span>
                    {selectedProduct.stock}
                  </ListGroup.Item>
                </ListGroup>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item>
                    <Accordion.Header className="fw-medium">
                      Summary
                    </Accordion.Header>
                    <Accordion.Body>{selectedProduct.summary}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                      {selectedProduct.description}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Card>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Products;
