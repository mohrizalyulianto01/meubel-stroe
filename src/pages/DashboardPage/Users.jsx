import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const Users = () => {
  const [dataAdmin, setDataAdmin] = useState({
    role: "",
    name: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/getuser", dataAdmin);
        setDataAdmin(response.data.user);
      } catch (error) {
        console.error("Failed to fetch data admin", error);
      }
    };
    fetchDataAdmin();
  },[dataAdmin])

  return (
    <Container className="p-3 fm-2">
      <Row lg="2">
        <Col lg="4">
          <Card className="fm-2 p-3">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300x300"
              className="d-block rounded mx-auto object-fit-cover" style={{maxWidth: "250px", maxHeight: "200px"}}
            />
            <Card.Body className="px-0">
              <Button variant="base" className="w-100 fs-7 py-2 border fw-bold">
                Choose Photo
              </Button>
            </Card.Body>
            
          </Card>
          {/* <Button variant="light" className="fw-semibold w-100 border my-3 p-2">
            <i className="ri-key-fill me-3"></i>Change Password
          </Button> */}
         
        </Col>
        <Col lg="8">
          <Card>
            <Card.Body className="fm-2 p-0">
              <Card.Title className="fw-bold border-bottom p-3">
                Data Admin
              </Card.Title>
              <Card.Text className="fs-7 px-3 mb-2">
                <label htmlFor="name" className="form-label fs-6">
                  Role:
                </label>

                <input
                  type="text"
                  id="role"
                  readOnly
                  className="form-control bg-secondary-subtle"
                  value={dataAdmin.role}
                  placeholder="Enter your full name"
                />
              </Card.Text>
              <Card.Text className="fs-7 px-3 mb-2">
                <label htmlFor="name" className="form-label fs-6">
                  Full Name:
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={dataAdmin.name}
                  placeholder="Enter full name"
                />
              </Card.Text>
              <Card.Text className="fs-7 px-3 mb-2">
                <label htmlFor="name" className="form-label fs-6">
                  Email:
                </label>

                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  value={dataAdmin.email}
                  placeholder="Enter email address"
                />
              </Card.Text>
              <Card.Text className="fs-7 px-3 mb-2">
                <label htmlFor="name" className="form-label fs-6">
                  Password:
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={dataAdmin.password}
                  placeholder="Enter new password"
                />
              </Card.Text>
              
            </Card.Body>
            {/* <Card.Footer className="fm-2 d-flex gap-2">
              <Button variant="warning">Edit</Button>
              <Button variant="success">Save</Button>
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
