import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import getBasketballProducts from './getBasketballProducts';
import getVolleyballProducts from './getVolleyballProducts';
import getSoccerProducts from './getSoccerProducts';
import './ProductDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const allProducts = [
    ...getBasketballProducts(),
    ...getVolleyballProducts(),
    ...getSoccerProducts(),
  ];

  const product = allProducts.find((p) => p.id.toString() === id);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Auto-close modal after 3 seconds
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  if (!product) {
    return <h2 className="text-center mt-5 text-danger">Product not found.</h2>;
  }

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowModal(true);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center align-items-center text-warning">
        <Col md={10} lg={8}>
          <div className="product-detail-card shadow-lg rounded-4 p-4 bg-light">
            <Row>
              {/* Product Image */}
              <Col md={6} className="d-flex align-items-center justify-content-center mb-4 mb-md-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded-4 border border-3 border-dark"
                />
              </Col>

              {/* Product Info */}
              <Col md={6}>
                <h2 className="fw-bold text-uppercase mb-3">{product.name}</h2>
                <Badge bg="primary" className="mb-3 px-3 py-2 fs-6 rounded-pill">
                  {product.sport} / {product.category}
                </Badge>
                <p className="fs-5 text-dark-emphasis mb-4">{product.description}</p>

                {/* Quantity Selector */}
                <InputGroup className="mb-3 w-50">
                  <Button variant="outline-secondary" onClick={decreaseQuantity}>
                    <FaMinus />
                  </Button>
                  <FormControl
                    type="text"
                    value={quantity}
                    readOnly
                    className="text-center"
                    aria-label="Quantity"
                  />
                  <Button variant="outline-secondary" onClick={increaseQuantity}>
                    <FaPlus />
                  </Button>
                </InputGroup>

                {/* Price and Add to Cart */}
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="fw-bold text-success">${product.price.toFixed(2)}</h3>
                  <Button
                    variant="warning"
                    className="fw-semibold px-4 py-2 shadow-sm rounded-pill"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Popup Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="cart-added-modal"
        className="cart-added-modal"
      >
        <Modal.Body className="text-center py-4">
          <h4 className="fw-bold mb-3">Added to Cart!</h4>
          <p className="mb-4">
            {quantity} x <span className="fw-semibold">{product.name}</span> added to your cart.
          </p>
          <Button
            variant="warning"
            className="rounded-pill px-4 py-2 fw-semibold"
            onClick={() => setShowModal(false)}
          >
            Continue Shopping
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ProductDetail;