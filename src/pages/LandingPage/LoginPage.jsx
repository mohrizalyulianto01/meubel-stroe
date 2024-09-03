import "../../styles/index.css";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import imglogin from "../../assets/Image/login-img.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import IconGoogle from "../../assets/Image/google_icons.webp";


const LoginPage = () => {
  const [isProtect, setIsProtect] = useState(true);
  const handleEye = () => {
    setIsProtect(!isProtect);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(errors);
    if (Object.keys(errors).length !== 0) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data
      );

      const { _id, role } = res.data.data;

      if (role === "owner") {
        toast.success("Successfully logged in as owner");
        navigate("/admin");
      } else if (role === "user") {
        localStorage.setItem("user", _id)
        toast.success("Successfully logged in");
        navigate("/account/profile", { replace: true });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section id="login" className="bg-dark-green">
      <Container className="py-5">
        <div className="card__container mx-auto">
          <Card
            className="bg-light p-3 mx-auto text-bg-dark border-0 w-100"
            data-aos="zoom-in"
          >
            <Card.Img
              className="d-block mx-auto my-3"
              style={{ width: "300px" }}
              src={imglogin}
            />
            <Card.Title className="fm-1 text-center fw-bold text-dark-dark">
              Sign to your account
            </Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 " controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    className="fm-2 border-1 bg-white "
                    placeholder="Enter email address"
                    value={data.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="password">
                  <Form.Control
                    type={isProtect ? "password" : "text"}
                    className="fm-2 bg-white border-end-0  rounded-0 rounded-start "
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="light"
                    className="bg-white border border-start-0 rounded-0 rounded-end"
                    onClick={handleEye}
                  >
                    <i
                      className={isProtect ? "ri-eye-off-line " : "ri-eye-line"}
                    ></i>
                  </Button>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  <p className="text-danger fs-7">{errors.password}</p>
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex justify-content-between text-keep"
                  controlId="keepSaveContainer"
                >
                  <Form.Check
                    type="checkbox"
                    id="keepSave"
                    label="Keep Save Login"
                    className="fm-2 fs-7 "
                  />
                  <a
                    href=""
                    className="fm-2 fs-7 text-link fw-medium  btn-link"
                  >
                    Forgot password?
                  </a>
                </Form.Group>
                <Form.Group className="mb-4 fm-3 text-center ">
                  <Button
                    type="submit"
                    variant="success"
                    className="border-0 px-5 fw-semibold w-100 btn__login"
                  >
                    Login
                  </Button>
                </Form.Group>
                <Form.Group
                  className="fm-2 fs-7 text-center d-flex justify-content-center gap-1 align-items-center"
                  controlId="toRegister"
                >
                  <p className="m-0 text-keep">Dont have an account?</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 fs-7 text-link fw-medium  btn-link"
                    onClick={() => navigate("/account/register")}
                  >
                    Register
                  </Button>
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-center align-items-center gap-3 my-2">
                <hr className="border-secondary w-100" />
                <span className="text-secondary fm-2 fw-medium">OR</span>
                <hr className="border-secondary w-100" />
              </div>
              <Button
                variant="light"
                className="border d-flex justify-content-center fm-2 gap-3 w-100 p-2 text-secondary"
              >
                <img src={IconGoogle} alt="" style={{ width: "25px" }} />
                Login with google account
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
