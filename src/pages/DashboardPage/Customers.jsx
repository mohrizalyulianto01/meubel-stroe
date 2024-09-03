import { Container, Row, Col, Table, Button, Modal, } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Customers = () => {
  const [show, setShow] = useState(false);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  const APIUrl = "http://localhost:5000";

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(APIUrl + "/api/v1/auth/users");
      setDataCustomers(response.data.data); // Access the 'data' property from the response
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch customers.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(APIUrl + `/api/v1/auth/users/${id}`);
      toast.success("Successfully deleted Customer");
      fetchCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete customer.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleShow = (customer) => {
    setSelectedCustomer(customer);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedCustomer(null);
  };
  return (
    <Container>
      <div className="table-responsive overflow-x-auto fm-2">
        <div className="card text-bg-dark border border-secondary">
          <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
            <Row xs="2" md="3" className="g-2 align-items-center w-100">
              <Col lg="4">
                <h3 className="card-title">Data Customers</h3>
              </Col>
              <Col lg="4" xs="12" className="order-last order-md-0">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-end-0"
                    placeholder="search customers ..."
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
                  Add Customers
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
                  {/* <th>Image</th> */}
                  <th>Role</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataCustomers.map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{index + 1}</td>
                    <td>{customer.role}</td>
                    {/* <td>
                      <img
                        src={customer.image}
                        alt={customer.name}
                        className="img-thumbnail"
                        width="100"
                      />
                    </td> */}
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    {/* <td>{customer.gender}</td> */}
                    <td className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShow(customer)}
                      >
                        <i className="ri-eye-line"></i>
                      </Button>

                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() =>
                          navigate(`edit/${customer._id}`, {
                            state: { customer },
                          })
                        }
                      >
                        <i className="ri-edit-box-line"></i>
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(customer._id)}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <Modal show={show} onHide={handleClose} className="fm-2">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCustomer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Card.Img
                src={APIUrl + selectedCustomer.image}
                className="w-50 d-block mx-auto"
              /> */}
            {selectedCustomer.role} <br />
            {selectedCustomer.name} <br />
            {selectedCustomer.email}
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Customers;
