import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { useCart } from './CartContext';

function CheckoutForm() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const validate = () => {
    let valid = true;
    const newErrors = {};

    // Required fields check
    ['firstName', 'lastName', 'email', 'phone', 'visa', 'cvv', 'expDate'].forEach((field) => {
      if (!form[field]) {
        newErrors[field] = 'Required';
        valid = false;
      }
    });

    // Custom validations
    if (form.firstName && form.firstName.length < 6) {
      newErrors.firstName = 'First name must be at least 6 characters';
      valid = false;
    }

    if (form.lastName && form.lastName.length < 3) {
      newErrors.lastName = 'Last name must be at least 3 characters';
      valid = false;
    }

    if (form.email && !form.email.includes('@')) {
      newErrors.email = 'Email must contain "@"';
      valid = false;
    }

    if (form.phone && !/^\d{7,}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be at least 7 digits';
      valid = false;
    }

    if (form.visa && !/^\d{12}$/.test(form.visa)) {
      newErrors.visa = 'Visa number must be exactly 12 digits';
      valid = false;
    }

    if (form.cvv && !/^\d{3}$/.test(form.cvv)) {
      newErrors.cvv = 'Security code must be exactly 3 digits';
      valid = false;
    }

    if (form.expDate) {
      // Format MM/YY
      if (!/^\d{2}\/\d{2}$/.test(form.expDate)) {
        newErrors.expDate = 'Expiration date must be in MM/YY format';
        valid = false;
      } else {
        // Optional: Validate month is between 01 and 12
        const [month] = form.expDate.split('/');
        if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
          newErrors.expDate = 'Expiration month must be between 01 and 12';
          valid = false;
        }
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleExpDateChange = (e) => {
    let val = e.target.value;
    // Remove non-digits and slash
    val = val.replace(/[^\d]/g, '');

    if (val.length > 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }

    if (val.length > 5) val = val.slice(0, 5);

    setForm({ ...form, expDate: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        clearCart();
      navigate('/confirmation');
    }
  };

  return (
    <Container className="py-4">
      <CheckoutSteps step={2} />
      <h2 className="mb-4">Payment Information</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={form.firstName || ''}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={form.lastName || ''}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email || ''}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={form.phone || ''}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={form.address || ''}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group controlId="visa" className="mb-3">
              <Form.Label>Visa Number</Form.Label>
              <Form.Control
                type="text"
                maxLength="12"
                value={form.visa || ''}
                onChange={(e) => setForm({ ...form, visa: e.target.value })}
                isInvalid={!!errors.visa}
              />
              <Form.Control.Feedback type="invalid">{errors.visa}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="cvv" className="mb-3">
              <Form.Label>Security Code</Form.Label>
              <Form.Control
                type="text"
                maxLength="3"
                value={form.cvv || ''}
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                isInvalid={!!errors.cvv}
              />
              <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="expDate" className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                value={form.expDate || ''}
                onChange={handleExpDateChange}
                isInvalid={!!errors.expDate}
              />
              <Form.Control.Feedback type="invalid">{errors.expDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit Payment
        </Button>
      </Form>
    </Container>
  );
}

export default CheckoutForm;
