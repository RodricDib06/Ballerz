import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import './BallerzHome.css';
import backgroundImage from './Assets/Background.png';
import basketballImg from './Assets/Basketball.png';
import volleyballImg from './Assets/Volleyball.png';
import soccerImg from './Assets/Soccer.png';
import { useNavigate, useLocation } from 'react-router-dom';

function BallerzHome() {
  const sportImages = {
    Basketball: basketballImg,
    Volleyball: volleyballImg,
    Soccer: soccerImg,
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    if (location.hash === '#sports') {
      const element = document.getElementById('sports-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.append('q', searchTerm);
    if (selectedSport) params.append('sport', selectedSport);
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedPrice) params.append('price', selectedPrice);
    if (sortOrder) params.append('sort', sortOrder); // Sort field

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div
      className="home-background d-flex align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className="overlay w-100 py-5">
        <Container>
          {/* Search Bar */}
          <Form
            className="d-flex justify-content-center bg-transparent border-0 shadow-none mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <Form.Control
              type="search"
              placeholder="Find what you are looking for..."
              className="me-2 shadow"
              style={{ maxWidth: '400px', borderRadius: '25px', padding: '10px 20px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" className="px-4 rounded-pill" onClick={handleSearch}>
              Search
            </Button>
          </Form>

          {/* Filters */}
          <Row className="justify-content-center mb-4">
            <Col md={3} className="mb-2">
              <Form.Select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                onChange={(e) => setSelectedPrice(e.target.value)}
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
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Description */}
          <div className="text-center text-contrast mb-4">
            <h5 className="fw-normal">
              Ballerz’s mission is to help aspiring athletes and professionals find the right gear.
            </h5>
            <p className="lead">
              Whether you're gearing up for a tournament or practicing in your backyard,
              we offer premium basketballs, volleyballs, soccer balls, jerseys, and more.
            </p>
            <p>
              Our e-commerce platform is designed with passion for sports lovers, athletes, and teams.
              With an easy-to-use interface and a wide variety of products, Ballerz is your trusted online store
              for high-performance gear.
            </p>
            <p className="mt-3">Explore, choose, and play like a pro. Welcome to the court, field, and beyond – welcome to Ballerz!</p>
          </div>

          {/* Sports Cards */}
          <div id="sports-section">
            <h3 className="text-center text-light mb-4">Sports Selection</h3>
          </div>

          <Row>
            {['Basketball', 'Volleyball', 'Soccer'].map((sport, id) => (
              <Col md={4} key={id} className="mb-4 d-flex">
                <Card className="shadow-sm border-0 flex-fill d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={sportImages[sport]}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{sport}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Top quality sports gear for champions.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/${sport.toLowerCase()}`)}
                    >
                      Shop Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BallerzHome;
