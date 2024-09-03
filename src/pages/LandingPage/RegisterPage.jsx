import "../../styles/index.css";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import imgsignup from "../../assets/Image/signup-img.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({});

  const handleEyePassword = () => {
    setIsPassword(!isPassword);
  };

  const handleEyeConfirmPassword = () => {
    setIsConfirmPassword(!isConfirmPassword);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const validate = () => {
    const errors = {};
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password do not match";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length !== 0) return;

    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", data);
      toast.success("Successfully registered");
      navigate("/account/login", { replace: true });
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
              src={imgsignup}
            />

            <Card.Title className="fm-1 text-center fw-bold text-dark-dark">
              Create your account
            </Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="completedName">
                  <Form.Control
                    type="text"
                    name="name"
                    className="fm-2"
                    placeholder="Enter Complete Name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    className="fm-2"
                    placeholder="Enter email address"
                    value={data.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="password">
                  <Form.Control
                    type={isPassword ? "password" : "text"}
                    name="password"
                    className="fm-2 rounded-0 rounded-start border-end-0"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="light"
                    className="bg-white border border-start-0 rounded-0 rounded-end"
                    onClick={handleEyePassword}
                  >
                    <i
                      className={isPassword ? "ri-eye-off-line" : "ri-eye-line"}
                    ></i>
                  </Button>
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex flex-column"
                  controlId="confirmPassword"
                >
                  <div className="d-flex">
                    <Form.Control
                      type={isConfirmPassword ? "password" : "text"}
                      name="confirmPassword"
                      className="fm-2 rounded-0 rounded-start border-end-0"
                      placeholder="Confirm Password"
                      value={data.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Button
                      variant="light"
                      className="bg-white border border-start-0 rounded-0 rounded-end"
                      onClick={handleEyeConfirmPassword}
                    >
                      <i
                        className={
                          isConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"
                        }
                      ></i>
                    </Button>
                  </div>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  <p className="text-danger fs-7">{errors.confirmPassword}</p>
                </Form.Group>

                <Form.Group className="mb-4 fm-3 text-center">
                  <Button
                    variant="success"
                    type="submit"
                    className="px-5 fw-semibold w-100"
                  >
                    Register
                  </Button>
                </Form.Group>
                <Form.Group
                  className="fm-2 fs-7 text-center d-flex justify-content-center gap-1 align-items-center"
                  controlId="toLogin"
                >
                  <p className="m-0 text-keep">Have an account?</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 fs-7"
                    onClick={()=> navigate("/account/login")}
                  >
                    Login
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default RegisterPage;
