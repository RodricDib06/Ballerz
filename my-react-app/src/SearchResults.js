import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import getBasketballProducts from './getBasketballProducts'; // Extend this later for all sports
import './SearchResults.css'; // Optional for page-specific styles
import getVolleyballProducts from './getVolleyballProducts';
import getSoccerProducts from './getSoccerProducts';


function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const searchTerm = query.get('q')?.toLowerCase() || '';
  const selectedSport = query.get('sport') || '';
  const selectedCategory = query.get('category') || '';
  const selectedPrice = query.get('price') || '';

  // For demo: use basketball only; later you can merge products from other sports
  const allProducts = [
  ...getBasketballProducts(),
  ...getVolleyballProducts(),
  ...getSoccerProducts()
];


  const filteredProducts = allProducts.filter(product => {
    const matchesSearch =
      searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    const matchesSport =
      selectedSport === '' || product.sport === selectedSport;

    const matchesCategory =
      selectedCategory === '' || product.category === selectedCategory;

    const matchesPrice =
      selectedPrice === '' ||
      (selectedPrice === 'Under50' && product.price < 50) ||
      (selectedPrice === '50to200' && product.price >= 50 && product.price <= 200) ||
      (selectedPrice === 'Above200' && product.price > 200);

    return matchesSearch && matchesSport && matchesCategory && matchesPrice;
  });

  return (
    <Container className="search-results-page py-5">
      <h2 className="text-center text-uppercase fancy-title mb-5">Search Results</h2>

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
