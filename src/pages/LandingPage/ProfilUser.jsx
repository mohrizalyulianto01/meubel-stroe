import "../../styles/index.css";
import BannerHeader from "../../common/Banner/BannerHeader";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect, useState } from "react";


const ProfilUser = () => {

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/auth/logout")
      toast.success("Successfully logged out")
      localStorage.removeItem("user")
      navigate("/account/login")
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const [dataCustomers, setDataCustomers] = useState({
    name: "",
    email: "",
    
    // phone: "",
    // address: "",
    // city: "",
  });
  const navigate = useNavigate();

  const APIUrl = "http://localhost:5000";

  useEffect(() => {
    const GetCustomers = async () => {
      try {
        const response = await axios.get(APIUrl + "/api/v1/auth/getuser", dataCustomers);
        setDataCustomers(response.data.user);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch customers.");
      }
    };

    GetCustomers();
  }, []);

  return (
    <section id="profile" className="bg-white overflow-hidden">
      <BannerHeader bannerTitle="Your Profile" />
      <Container className="py-3 py-md-5">
        <Row lg="2">
          <Col lg="4">
            <Card className="fm-2 p-3">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x300"
                className="d-block rounded mx-auto"
              />
              <Card.Body className="px-0">
                <Button
                  variant="base"
                  className="w-100 fs-7 py-2 border fw-bold"
                >
                  Choose Photo
                </Button>
              </Card.Body>
              <Card.Footer className="px-0 bg-transparent border-0">
                <Card.Text className="fs-7">
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi
                  file yang diperbolehkan: .JPG .JPEG .PNG
                </Card.Text>
              </Card.Footer>
            </Card>
            <Button variant="base" className="fw-bold w-100 border my-3 p-2">
              <i className="ri-key-fill me-3"></i>Change Password
            </Button>
            <Button
              variant="danger"
              className="fw-medium w-100 border p-2"
              onClick={handleLogout}
            >
              <i className="ri-logout-box-line me-2"></i>Logout
            </Button>
          </Col>
          <Col lg="8">
            <Card>
              <Card.Body className="fm-2 p-0">
                <Card.Title className="fw-bold border-bottom p-3">
                  Biodata Diri
                </Card.Title>
                <Card.Text className="fs-7 px-3">
                  <label htmlFor="name" className="form-label fs-6">
                    Full Name:
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={dataCustomers.name}
                    placeholder="Enter your full name"
                  />
                </Card.Text>
                <Card.Text className="fs-7 px-3">
                  <label htmlFor="name" className="form-label fs-6">
                    Date:
                  </label>

                  <input type="date" id="ttl" className="form-control" />
                </Card.Text>
                <Card.Text className="fs-7 px-3 mb-3">
                  <label htmlFor="name" className="form-label fs-6">
                    Gender:
                  </label>

                  <select className="form-select">
                    <option>Choose gender</option>
                    <option value="">Male</option>
                    <option value="">Female</option>
                  </select>
                </Card.Text>
                <Card.Title className="fw-bold border-bottom border-top p-3">
                  Contact
                </Card.Title>
                <Card.Text className="fs-7 px-3">
                  <label htmlFor="name" className="form-label fs-6">
                    Email:
                  </label>

                  <input
                    type="email"
                    id="email"
                    value={dataCustomers.email}
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                </Card.Text>
                <Card.Text className="fs-7 px-3">
                  <label htmlFor="name" className="form-label fs-6">
                    No. Telp:
                  </label>
                  <input
                    type="number"
                    id="name"
                    className="form-control"
                    placeholder="Enter your nomor telephone"
                  />
                </Card.Text>
                <Card.Text className="fs-7 px-3">
                  <label htmlFor="name" className="form-label fs-6">
                    City:
                  </label>

                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your city"
                  />
                </Card.Text>
                <Card.Text className="fs-7 px-3 pb-3">
                  <label htmlFor="name" className="form-label fs-6">
                    Address:
                  </label>

                  <textarea
                    id="name"
                    className="form-control"
                    placeholder="Enter your address"
                  ></textarea>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="fm-2 d-flex gap-2">
                <Button variant="warning">Edit</Button>
                <Button variant="success">Save</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProfilUser;
