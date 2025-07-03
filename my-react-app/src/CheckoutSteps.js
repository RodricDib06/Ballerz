import React from 'react';
import { Container } from 'react-bootstrap';
import './CheckoutSteps.css';

const CheckoutSteps = ({ step }) => {
  const steps = [
    { number: 1, label: 'Cart' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Confirmation' },
  ];

  return (
    <Container className="py-5">
      <div className="checkout-steps d-flex justify-content-center align-items-center my-5">
        {steps.map(({ number, label }, index) => (
          <React.Fragment key={number}>
            <div
              className={`step d-flex align-items-center justify-content-center px-4 py-2 rounded-pill ${
                step >= number ? 'active bg-warning text-dark' : 'bg-light text-muted'
              }`}
            >
              <span className="step-label fw-semibold text-uppercase">{label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`line mx-3 ${step > number ? 'active bg-warning' : 'bg-secondary'}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export default CheckoutSteps;