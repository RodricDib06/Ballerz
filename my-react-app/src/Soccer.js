import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import getSoccerProducts from './getSoccerProducts';
import './Basketball.css';
import { useNavigate } from 'react-router-dom';

function Soccer() {
  const allProducts = getSoccerProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortOrder,setSortOrder] = useState('');
  const navigate = useNavigate();

  // Handle filtering and searching
  const filteredProducts = allProducts
  .filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

    const matchesPrice =
      priceFilter === 'All' ||
      (priceFilter === 'Under50' && product.price < 50) ||
      (priceFilter === '50to200' && product.price >= 50 && product.price <= 200) ||
      (priceFilter === 'Above200' && product.price > 200);

    return matchesSearch && matchesCategory && matchesPrice;
  })
  .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  return (
    <Container className="page py-5">
      <h2 className="text-center text-uppercase fancy-title mb-4">Our Soccer Items</h2>

      {/* Search Bar */}
      <Row className="justify-content-center bg-transparent mb-4">
        <Col md={6}>
          <Form className="d-flex bg-transparent border-0 shadow-none">
            <Form.Control
              type="text"
              placeholder="Search for soccer gear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button variant="warning" onClick={() => setSearchTerm(searchTerm.trim())}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="justify-content-center mb-4">
        <Col md={3}>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Shoes">Shoes</option>
            <option value="Balls">Balls</option>
            <option value="General Equipment">General Equipment</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="Under50">Under $50</option>
            <option value="50to200">$50 - $200</option>
            <option value="Above200">Above $200</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Cards */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                    <span className="price-tag text-black">${product.price.toFixed(2)}</span>
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
          ))
        ) : (
          <p className="text-center mt-5">No products match your criteria.</p>
        )}
      </Row>
    </Container>
  );
}

export default Soccer;