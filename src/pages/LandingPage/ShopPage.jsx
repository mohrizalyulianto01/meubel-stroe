/* eslint-disable react-hooks/exhaustive-deps */

import "../../styles/index.css";
import { Container, Row, Col, Button, Card} from "react-bootstrap";
import Categories from "../../assets/data/Category.jsx";
import Stylis from "../../assets/data/Style.jsx";
import Sizes from "../../assets/data/Sizes.jsx";
import Products from "../../assets/data/ProductList.jsx";
import BannerHeader from "../../common/Banner/BannerHeader.jsx";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import { toast } from "react-toastify";


const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();

   const filterProducts = () => {
     const keyword = searchKeyword.toLowerCase();
     const filtered = Products.filter(
       (product) =>
         (selectedCategory ? product.category === selectedCategory : true) &&
         (selectedStyle ? product.style === selectedStyle : true) &&
         (selectedSize
           ? getSizeFromSummary(product.summary) < selectedSize
           : true) &&
         (product.title.toLowerCase().includes(keyword) ||
           product.summary.toLowerCase().includes(keyword))
     );
     setFilteredProducts(filtered);
  };
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedStyle, selectedSize, searchKeyword]);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setSearchKeyword("");
    setSelectedStyle("");
    setSelectedSize(null); 
  };

  const handleStyle = (style) => {
    setSelectedStyle(style);
  };
  const handleSize = (size) => {
    setSelectedSize(size);
  };

  const getSizeFromSummary = (summary) => {
    const match = summary.match(/(\d+)/);
    return match ? parseInt(match[0]) : null;
  };

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedStyle("");
    setSelectedSize(null);
    setSearchKeyword("");
  }

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        totalPrice: product.price,
      })
    )
    toast.success("Product has been added to cart");
  };

  return (
    <>
      <section id="shop" className="bg-light pb-4 overflow-hidden">
        <BannerHeader bannerTitle="SHOP" />
        <Container className="my-4">
          <Row md="2" className="g-0 g-md-3 g-lg-5 ">
            <Col
              md="3"
              className="bg-light p-3 rounded h-max-content "
              data-aos="fade-right"
            >
              <div className="category__product ">
                <h1 className="fw-semibold fs-5 fm-4 mb-1">Categories:</h1>
                <Row className="g-1 g-lg-2">
                  {Categories.map((category, index) => (
                    <Col key={index}>
                      <Button
                        variant="dark"
                        size="md"
                        className={`w-100 border-0 px-3 rounded-2 fw-medium ${
                          selectedCategory === category.title
                            ? "bg-warning text-dark fw-semibold"
                            : ""
                        }`}
                        onClick={() => handleCategory(category.title)}
                      >
                        <i className={category.icons}></i>
                        <span className="ms-2 fs-7 fm-2">{category.title}</span>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className=" design__product mt-3">
                <h1 className=" fw-semibold fs-5 fm-4 mb-1">Style:</h1>
                <Row className="g-1 g-lg-2">
                  {Stylis.map((style, index) => (
                    <Col key={index}>
                      <Button
                        variant="dark"
                        size="md"
                        className={`w-100 border-0 rounded-2 fw-medium ${
                          selectedStyle === style.title
                            ? "bg-warning text-dark fw-semibold"
                            : ""
                        }`}
                        onClick={() => handleStyle(style.title)}
                      >
                        <span className="fs-7 fm-2">{style.title}</span>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="size__Product mt-3">
                <h1 className="fw-semibold fs-5 fm-4 mb-1">Sizes:</h1>
                <Row className="g-1 g-lg-2">
                  {Sizes.map((size, index) => (
                    <Col key={index}>
                      <Button
                        variant="dark"
                        size="md"
                        className={`w-100 px-2 px-md-3 px-lg-2 border-0 rounded-2 fw-medium ${
                          selectedSize === size.value
                            ? "bg-warning text-dark fw-semibold"
                            : ""
                        }`}
                        onClick={() => handleSize(size.value)}
                      >
                        <span className="fs-7 fm-2">{size.title}</span>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col  md="9">
              <div
                className="search__product mt-2 mt-md-0 d-flex gap-2"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                {/* <Link to="/home">
                  <Button variant="primary" className="border">
                    <i className="ri-home-5-line"></i>
                  </Button>
                </Link> */}
                <div className="input-group fm-2">
                  <input
                    type="text"
                    className="form-control fs-6 border-2 border-end-0 border-secondary-subtle"
                    placeholder="Cari Furniture"
                    value={searchKeyword}
                    onChange={handleSearch}
                  />
                  <span className="border-2 border-start-0 border-secondary-subtle rounded-right input-group-text fw-semibold">
                    <i className="ri-search-line"></i>
                  </span>
                </div>
                <Button
                  variant="light"
                  size="md"
                  className="btn__clear fm-2 fw-medium border-secondary-subtle border-2"
                  onClick={() => handleClear()}
                >
                  <i className="ri-filter-off-line"></i>
                </Button>
              </div>
              <div
                className="furniture__product mt-3 mt-md-2 mt-lg-4"
                style={{ minHeight: "100vh" }}
              >
                <Row xs="2" md="3" lg="3" className="g-2 g-lg-4">
                  {filteredProducts.length === 0 ? (
                    <h1 className="fw-semibold fs-5 fm-4 text-center w-100">
                      No Product Found
                    </h1>
                  ) : (
                    filteredProducts.map((product) => (
                      <Col key={product.id} data-aos="zoom-in">
                        <div className="card__container">
                          <Card className="h-100 w-100 rounded-0 bg-light fm-2 overflow-hidden border-2">
                            <div className="">
                            <Card.Img
                              variant="top"
                              src={product.image}
                              alt={product.title}
                              className={`d-block w-100 rounded-0 ${
                                product.category === "Bed"
                                ? "object-fit-cover"
                                : "object-fit-contain"
                                }`}
                                />
                              </div>
                            <Card.Footer className="d-flex align-items-center justify-content-between p-0 bg-light position-relative z-1 w-100 border-2 rounded-0">
                              <p className="mb-0 ms-3 ms-md-2 fs-7">
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
                            <Button className="w-100 text-bg-light border-0 text-start fm-2 mt-2 p-0 bg-transparent">
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
                    ))
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ShopPage;
