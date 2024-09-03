import BannerHeader from "../../common/Banner/BannerHeader.jsx";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Products from "../../assets/data/ProductList.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavDescription from "../../common/NavTabs/NavDescription.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import { toast } from "react-toastify";

const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = Products.find((item) => item.id.toString() === id);
  if (!product) {
    return (
      <Container className="py-5 mt-5 text-center fm-2">
        <h1>Product not found</h1>
        <p>The product you are looking for does not exist.</p>
        <Button variant="primary" onClick={() => window.history.back()}>
          <i className="ri-arrow-left-line me-2"></i>
          Go Back
        </Button>
      </Container>
    );
  }
  const { title, summary, image, price, description, category } = product;

  const handlePlus = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMin = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice: product.price * quantity,
      })
    );

    toast.success("Product has been added to cart");
  };

  return (
    <>
      <section id="detailProduct" className="bg-secondary-subtle">
        <BannerHeader bannerTitle="Detail Product" />
        <Container className="pt-5 pb-5">

          <div className="detail__items">
            <Row lg="2" className="g-3 gy-5">
              <Col lg="6" className="d-flex">
                <div
                  className="img__items mx-auto bg-light rounded-4 overflow-hidden "
                  style={{ height: "350px", width: "100%" }}
                >
                  <Image
                    src={image}
                    alt={title}
                    className={`w-100 h-100 d-block mx-auto ${
                      category === "Bed"
                        ? "object-fit-cover"
                        : "object-fit-contain"
                    }`}
                  />
                </div>
              </Col>
              <Col lg="6">
                <div className="spesifik__items fm-2 pt-3 p-md-4">
                  <h1 className="fs-4 fw-semibold m-0">{title}</h1>
                  <p className="mb-2 fs-7">{summary}</p>
                  <p className="fw-medium">{formatToIDR(price)}</p>
                  <div className="d-flex align-items-center gap-1 mb-3 fs-7">
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    <i className="ri-star-line"></i>
                    (0.0)
                  </div>
                  <div className="qty__items d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="warning"
                        size="sm"
                        className="rounded-1 fw-bold rounded-end-0 border-0"
                        onClick={handleMin}
                      >
                        <i className="ri-subtract-fill"></i>
                      </Button>

                      <input
                        type="text"
                        className="form-control form-control-sm text-center fw-semibold border-0 rounded-0"
                        readOnly
                        style={{ maxWidth: "40px" }}
                        value={quantity}
                      />
                      <Button
                        variant="warning"
                        size="sm"
                        className="rounded-1 fw-bold rounded-start-0 border-0"
                        onClick={handlePlus}
                      >
                        <i className="ri-add-fill"></i>
                      </Button>
                    </div>
                    <p className="mb-0 fw-semibold">Qty</p>
                  </div>
                  <Button
                    variant="warning"
                    className="fs-7 fw-semibold rounded-1 mt-3 btn__cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                    <i className="ri-shopping-cart-2-line ms-2"></i>
                  </Button>
                </div>
              </Col>
              <Col lg="12">
                <NavDescription description={description} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DetailProduct;
