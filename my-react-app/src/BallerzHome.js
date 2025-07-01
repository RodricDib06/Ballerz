// BallerzHome.js
import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (location.hash === '#sports') {
      const element = document.getElementById('sports-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
          <Form className="d-flex justify-content-center mb-4">
            <Form.Control
              type="search"
              placeholder="Find what you are looking for..."
              className="me-2 shadow"
              style={{ maxWidth: '400px', borderRadius: '25px', padding: '10px 20px' }}
            />
            <Button variant="primary" className="px-4 rounded-pill">Search</Button>
          </Form>

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

          <div id="sports-section">
            <h3 className="text-center text-light mb-4">Sports Selections</h3>
          </div>

          <Row>
            {['Basketball', 'Volleyball', 'Soccer'].map((sport, id) => (
              <Col md={4} key={id} className="mb-4 d-flex">
                <Card className="shadow-sm border-0 flex-fill d-flex flex-column">
                  <Card.Img variant="top" src={sportImages[sport]} style={{ height: '250px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{sport}</Card.Title>
                    <Card.Text className="flex-grow-1">Top quality sports gear for champions.</Card.Text>
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
