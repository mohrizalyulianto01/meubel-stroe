import "./BestSeller.css";
import "../../../styles/index.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Products from "../../../assets/data/ProductList.jsx";
import Categories from "../../../assets/data/Category.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice.jsx";
import { toast } from "react-toastify";

const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const BestSellerSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Chair");
  const dispatch = useDispatch();

  const filteredProducts = selectedCategory
    ? Products.filter((product) => product.category === selectedCategory)
    : Products;

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        totalPrice: product.price,
      })
    );

    toast.success("Product has been added to cart");
  };
  return (
    <>
      <section id="bestseller" className="py-5 bg-light">
        <Container className="my-5 ">
          <div
            className="title text-uppercase max-content mx-auto mb-4"
            data-aos="fade-left"
          >
            <p className="py-1 px-2 text-orange border border-secondary max-content mx-auto fm-1 fs-7 fw-bold fst-italic mb-1">
              Best Seller
            </p>
            <h3 className="fm-2 fs-4 fw-bold text-dark-dark">Home Decor</h3>
          </div>

          <div className="p-2 ">
            <div className="category__btn ">
              <Row className="g-2">
                {Categories.map((category, index) => (
                  <Col key={index}>
                    <button
                      className={`fm-2 w-100 fw-semibold border-0  py-2 ${
                        category.title === selectedCategory ? "active" : ""
                      }`}
                      data-aos="zoom-out-down"
                      data-aos-delay={category.delay}
                      onClick={() => setSelectedCategory(`${category.title}`)}
                    >
                      <i className={`${category.icons} fs-5`}></i>
                      <span className="ms-2">{category.title}</span>
                    </button>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="product__container mt-3">
              <Row xs="2" md="3" lg="4" className="g-4">
                {filteredProducts.map((product) => (
                  <Col
                    key={product.id}
                    data-aos="zoom-in"
                    data-aos-delay={product.delay}
                  >
                    <div className="card__container">
                      <Card className="h-100 w-100 rounded-0 bg-secondary-subtle fm-2 overflow-hidden ">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          alt={product.title}
                          className={`d-block w-100 rounded-0 ${
                            selectedCategory === "Bed"
                              ? "object-fit-cover"
                              : "object-fit-contain"
                          }`}
                        />
                        <Card.Footer className="d-flex align-items-center justify-content-between p-0 bg-light position-relative z-1 w-100 border-2 rounded-0">
                          <p className="mb-0 ms-2 ms-md-3">
                            {formatToIDR(product.price)}
                          </p>
                          <Button
                            variant="warning"
                            className="rounded-0"
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="ri-shopping-cart-2-line fs-6"></i>
                          </Button>
                        </Card.Footer>
                      </Card>
                      <Link to={`/shop/${product.id}`}>
                        <Button className="w-100 border-0 text-start fm-2 mt-2 p-0 text-dark" variant="base">
                          <Card.Title className="fs-6 fw-semibold">
                            {product.title}
                          </Card.Title>
                          <Card.Text className="fs-7">
                            {product.summary}
                          </Card.Text>
                        </Button>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BestSellerSection;
