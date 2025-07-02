// CheckoutSteps.js
import React from 'react';
import './CheckoutSteps.css';

function CheckoutSteps({ step }) {
  return (
    <div className="checkout-steps d-flex justify-content-center align-items-center my-4">
      <div className={`step ${step >= 1 ? 'active' : ''}`}>Cart</div>
      <div className={`line ${step >= 2 ? 'active' : ''}`}></div>
      <div className={`step ${step >= 2 ? 'active' : ''}`}>Payment</div>
      <div className={`line ${step >= 3 ? 'active' : ''}`}></div>
      <div className={`step ${step === 3 ? 'active' : ''}`}>Confirmation</div>
    </div>
  );
}

export default CheckoutSteps;
