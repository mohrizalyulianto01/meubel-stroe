import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import BannerHeader from "../../common/Banner/BannerHeader.jsx";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../redux/cartSlice.jsx";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const TableHeader = [
  {
    title: "Product Details",
    col: 6,
    align: "start",
  },
  {
    title: "Price",
    col: 3,
    align: "center",
  },
  {
    title: "Total",
    col: 3,
    align: "center",
  },
];

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.data || []);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id));

    toast.success("Product has been removed");
  };

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const totalItems = cartItems
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  const totalPrice = cartItems
    ? cartItems.reduce((total, item) => total + item.totalPrice, 0)
    : 0;

  const handleShippingChange = (event) => {
    const selectedShippingPrice = parseInt(event.target.value, 10);
    setShippingPrice(selectedShippingPrice);
  };

  const totalPriceWithShipping = totalPrice + shippingPrice;

  useEffect(() => {
    const validateForm = () => {
      if (email && name && city && address && cartItems.length > 0) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
    validateForm();
  }, [email, name, city, address, cartItems]);
  const handlePayment = async () => {
    toast.success("Your order has been received");
  };

  return (
    <>
      <section id="cart" className="pb-5 bg-secondary-subtle overflow-hidden">
        <BannerHeader bannerTitle="CART" />
        <Container
          className="my-5"
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0, 0.1)",
          }}
        >
          <Row lg="2" className="gx-2 g-md-0 h-max-content">
            <Col lg="8" className="p-3 bg-white">
              <div className="title__cart d-flex justify-content-between align-items-center w-100 pb-3 mb-3 border-bottom border-2 border-secondary-subtle">
                <h1 className="m-0 fs-5 fw-bold fm-2">Shopping Cart</h1>
                <p className="m-0 fw-semibold fm-2">{totalItems} items</p>
              </div>
              <Row
                xs="3"
                className="g-0 text-uppercase d-md-flex d-none text-center mb-3"
              >
                {TableHeader.map((header, index) => (
                  <Col
                    key={index}
                    md={header.col}
                    className={`text-${header.align}`}
                  >
                    <p className="p-0 border-0 fw-bold fs-7">{header.title}</p>
                  </Col>
                ))}
              </Row>
              {cartItems.length === 0 ? (
                <Row>
                  <Col xs="12">
                    <h1 className="text-center py-5 fs-6 fw-semibold m-0 fst-italic">
                      Your Cart is empty
                    </h1>
                  </Col>
                </Row>
              ) : (
                cartItems.map((item) => (
                  <Row
                    key={item.id}
                    md="3"
                    className="g-3 g-md-0 mb-4 border-bottom pb-3"
                  >
                    <Col md="6" xs="12" className="d-flex gap-2">
                      <Image
                        src={item.image}
                        className="bg-secondary-subtle border-0 rounded object-fit-cover img__cart"
                      />
                      <div className="ket__cart d-flex flex-column justify-content-between">
                        <Link
                          to={`/shop/${item.id}`}
                          className="text-decoration-none text-dark"
                        >
                          <h1 className="fs-6 fw-bold m-0">{item.title}</h1>
                          <p className="fs-7 mb-1">{item.summary}</p>
                          <p className="fs-7 mb-2">{item.category}</p>
                        </Link>
                        <div className="d-flex gap-3 ">
                          <Button
                            variant="danger"
                            size="sm"
                            className="fs-7"
                            onClick={() => handleRemove(item.id)}
                          >
                            <i className="ri-delete-bin-6-line"></i>
                          </Button>
                          <div className="d-flex">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-end-0"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.quantity > 1 ? item.quantity - 1 : 1
                                )
                              }
                            >
                              <i className="ri-subtract-line"></i>
                            </Button>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center rounded-0"
                              style={{ width: "40px" }}
                              readOnly
                              value={item.quantity}
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-start-0"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <i className="ri-add-line"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="3" xs="6">
                      <span className="fw-bold d-block d-md-none">Price:</span>
                      <p className="text-start m-0 text-md-center fw-medium">
                        {formatToIDR(item.price)}
                      </p>
                    </Col>
                    <Col md="3" xs="6">
                      <span className="fw-bold d-block d-md-none">Total:</span>
                      <p className="text-start m-0 text-md-center fw-medium">
                        {formatToIDR(item.totalPrice)}
                      </p>
                    </Col>
                  </Row>
                ))
              )}
            </Col>
            <Col
              lg="4"
              className="p-3 bg-dark-subtle h-max-content"
            >
              <div className="title__shipping d-flex justify-content-between align-items-center w-100 pb-3 mb-3 border-bottom border-2 border-secondary">
                <h1 className="m-0 fs-5 fw-bold fm-2">Shipping Information</h1>
              </div>
              <div className="order__summary fm-2">
                <Form>
                  <Form.Group className="mb-2 fs-7 d-flex justify-content-between align-items-center">
                    <p className="m-0 fw-semibold">Items: {totalItems}</p>
                    <input
                      type="text"
                      className="border-0 fw-semibold bg-transparent text-end"
                      readOnly
                      value={formatToIDR(totalPrice)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fs-7 fw-medium"
                    controlId="formEmail"
                  >
                    <Form.Label className="mb-1">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      className="fs-7"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fs-7 fw-medium"
                    controlId="formShippingAddress"
                  >
                    <Form.Label className="mb-1">Shipping address</Form.Label>
                    <Form.Control
                      type="text"
                      className="fs-7 rounded-bottom-0"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                      type="text"
                      className="fs-7 rounded-top-0 rounded-bottom-0 border-top-0 border-bottom-0"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Form.Control
                      as="textarea"
                      className="fs-7 rounded-top-0"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fs-7 border-bottom border-2 border-secondary pb-4"
                    controlId="formShipping"
                  >
                    <Form.Label className="mb-1 fw-medium">Shipping</Form.Label>
                    <Form.Select
                      size="sm"
                      className="fs-7 p-2"
                      onChange={handleShippingChange}
                    >
                      <option value="200000">
                        JNT - {formatToIDR(200000)}
                      </option>
                      <option value="180000">
                        JNE Express - {formatToIDR(180000)}
                      </option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4 fs-7 d-flex justify-content-between">
                    <Form.Label className="mb-1 fw-medium">
                      Total Cost:
                    </Form.Label>
                    <input
                      type="text"
                      className="border-0 bg-transparent text-end fw-bold"
                      readOnly
                      value={
                        totalItems == 0
                          ? formatToIDR(0)
                          : formatToIDR(totalPriceWithShipping)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-2 fs-7">
                    <Button
                      className="w-100 text-uppercase fw-semibold"
                      onClick={handlePayment}
                      disabled={!isFormValid}
                    >
                      Checkout
                    </Button>
                  </Form.Group>
                </Form>
                <Link
                  to="/shop"
                  className="text-decoration-none fm-2 fs-7 fw-medium"
                >
                  <i className="ri-arrow-left-line me-1"></i>
                  Continue Shopping
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;
