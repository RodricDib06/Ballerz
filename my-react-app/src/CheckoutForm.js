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

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'province',
      'postalCode',
      'visa',
      'cvv',
      'expDate'
    ];

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = 'Required';
        valid = false;
      }
    });

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

    if (form.address) {
      const address = form.address.trim();
      const hasLetters = /[a-zA-Z]/.test(address);
      const hasNumbers = /[0-9]/.test(address);

      if (address.length < 6 || !hasLetters || !hasNumbers) {
        newErrors.address = 'Address must be at least 6 characters and include both letters and numbers';
        valid = false;
      }
    }

    if (form.postalCode && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(form.postalCode)) {
      newErrors.postalCode = 'Invalid postal code (e.g., K1A 0B1)';
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
      if (!/^\d{2}\/\d{2}$/.test(form.expDate)) {
        newErrors.expDate = 'Expiration date must be in MM/YY format';
        valid = false;
      } else {
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
    let val = e.target.value.replace(/[^\d]/g, '');
    if (val.length > 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    if (val.length > 5) val = val.slice(0, 5);
    setForm({ ...form, expDate: val });
  };

  const handleVisaChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12); // digits only, max 12
    setForm({ ...form, visa: raw });
  };

  const getMaskedVisa = () => {
    const visa = form.visa || '';
    const visible = visa.slice(-4);
    return visa ? '**** **** **** ' + visible : '';
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
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={form.city || ''}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
           <Form.Group controlId="province" className="mb-3">
  <Form.Label>Province/Territory</Form.Label>
  <Form.Select
    value={form.province || ''}
    onChange={(e) => setForm({ ...form, province: e.target.value })}
    isInvalid={!!errors.province}
  >
    <option value="">Select a province or territory</option>
    <option value="Alberta">Alberta</option>
    <option value="British Columbia">British Columbia</option>
    <option value="Manitoba">Manitoba</option>
    <option value="New Brunswick">New Brunswick</option>
    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
    <option value="Nova Scotia">Nova Scotia</option>
    <option value="Ontario">Ontario</option>
    <option value="Prince Edward Island">Prince Edward Island</option>
    <option value="Quebec">Quebec</option>
    <option value="Saskatchewan">Saskatchewan</option>
    <option value="Northwest Territories">Northwest Territories</option>
    <option value="Nunavut">Nunavut</option>
    <option value="Yukon">Yukon</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
</Form.Group>

          </Col>

          <Col md={4}>
            <Form.Group controlId="postalCode" className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                value={form.postalCode || ''}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                isInvalid={!!errors.postalCode}
              />
              <Form.Control.Feedback type="invalid">{errors.postalCode}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="visa" className="mb-3">
              <Form.Label>Visa Number</Form.Label>
              <Form.Control
                type="text"
                maxLength="12"
                value={getMaskedVisa()}
                onChange={handleVisaChange}
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
