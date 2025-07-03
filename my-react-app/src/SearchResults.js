import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import getBasketballProducts from './getBasketballProducts';
import getVolleyballProducts from './getVolleyballProducts';
import getSoccerProducts from './getSoccerProducts';
import './SearchResults.css';

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Initialize state from query parameters
  const [searchTerm, setSearchTerm] = useState(query.get('q')?.toLowerCase() || '');
  const [selectedSport, setSelectedSport] = useState(query.get('sport') || '');
  const [selectedCategory, setSelectedCategory] = useState(query.get('category') || '');
  const [selectedPrice, setSelectedPrice] = useState(query.get('price') || '');
  const [sortOrder, setSortOrder] = useState(query.get('sort') || '');

  const allProducts = [
    ...getBasketballProducts(),
    ...getVolleyballProducts(),
    ...getSoccerProducts(),
  ];

  // Function to update URL with current filter states
  const updateQueryParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm.trim());
    if (selectedSport) params.set('sport', selectedSport);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedPrice) params.set('price', selectedPrice);
    if (sortOrder) params.set('sort', sortOrder);
    navigate(`?${params.toString()}`);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    updateQueryParams();
  };

  // Handle filter changes
  const handleFilterChange = (setter, key) => (e) => {
    setter(e.target.value);
    const params = new URLSearchParams(location.search);
    if (e.target.value) {
      params.set(key, e.target.value);
    } else {
      params.delete(key);
    }
    navigate(`?${params.toString()}`);
  };

  // Filter products
  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);

      const matchesSport = selectedSport === '' || product.sport === selectedSport;

      const matchesCategory =
        selectedCategory === '' || product.category === selectedCategory;

      const matchesPrice =
        selectedPrice === '' ||
        (selectedPrice === 'Under50' && product.price < 50) ||
        (selectedPrice === '50to200' && product.price >= 50 && product.price <= 200) ||
        (selectedPrice === 'Above200' && product.price > 200);

      return matchesSearch && matchesSport && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  return (
    <Container className="search-results-page py-5">
      <h2 className="text-center text-uppercase fancy-title mb-4">Search Results</h2>

      {/* Search Bar */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form className="d-flex bg-transparent border-0 shadow-none" onSubmit={handleSearch}>
            <Form.Control
              type="text"
              placeholder="Search for sports gear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button variant="warning" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="justify-content-center mb-4">
        <Col md={3} className="mb-2">
          <Form.Select
            value={selectedSport}
            onChange={handleFilterChange(setSelectedSport, 'sport')}
          >
            <option value="">All Sports</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Soccer">Soccer</option>
          </Form.Select>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select
            value={selectedCategory}
            onChange={handleFilterChange(setSelectedCategory, 'category')}
          >
            <option value="">All Categories</option>
            <option value="Shoes">Shoes</option>
            <option value="Balls">Balls</option>
            <option value="General Equipment">General Equipment</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </Form.Select>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select
            value={selectedPrice}
            onChange={handleFilterChange(setSelectedPrice, 'price')}
          >
            <option value="">All Prices</option>
            <option value="Under50">Under $50</option>
            <option value="50to200">$50 - $200</option>
            <option value="Above200">Above $200</option>
          </Form.Select>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select
            value={sortOrder}
            onChange={handleFilterChange(setSortOrder, 'sort')}
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Cards */}
      {filteredProducts.length > 0 ? (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="product-card h-100 text-white shadow">
                <div className="product-img-wrapper">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
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
      ) : (
        <div className="text-center mt-5">
          <h4 className="text-light">No products match your search criteria.</h4>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate('/')}
          >
            Go Back to Home
          </Button>
        </div>
      )}
    </Container>
  );
}

export default SearchResults;