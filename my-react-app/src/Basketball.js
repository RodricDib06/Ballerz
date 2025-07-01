// Basketball.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import getBasketballProducts from './getBasketballProducts';
import './Basketball.css';
import { useNavigate } from 'react-router-dom';

function Basketball() {
  const products = getBasketballProducts();
  const navigate = useNavigate();

  return (
    <Container className="basketball-page py-5">
      <h2 className="text-center text-uppercase fancy-title mb-5">Our Basketball Items</h2>
      <Row>
        {products.map((product) => (
         <Col key={product.id} md={4} className="mb-4">
            <Card className="product-card h-100 text-white">
                <div className="product-img-wrapper">
                <Card.Img variant="top" src={product.image} />
                </div>
                <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title className="fw-bold text-shadow">{product.name}</Card.Title>
                    <Card.Text className="product-description">{product.description}</Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="price-tag">${product.price.toFixed(2)}</span>
                    <Button
                    variant="light"
                    className="rounded-pill fw-semibold"
                    onClick={() => navigate(`/product/${product.id}`)}
                    >
                    View
                    </Button>
                </div>
                </Card.Body>
            </Card>
            </Col>

        ))}
      </Row>
    </Container>
  );
}

export default Basketball;
