import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import './ConfirmationPage.css';

const surveyQuestions = [
  'How easy was it to find the products you needed?',
  'Was the checkout process simple and clear?',
  'Are you satisfied with the overall shopping experience?',
];

function ConfirmationPage({ setCart }) {  // <-- receive setCart here
  const [responses, setResponses] = useState(Array(surveyQuestions.length).fill(0));
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleStarClick = (questionIndex, rating) => {
    const updated = [...responses];
    updated[questionIndex] = rating;
    setResponses(updated);
  };

  const isSurveyComplete = responses.every((rating) => rating > 0);

  const handleSubmit = () => {
    if (isSurveyComplete) {
      setShowError(false);
      // stay on the page, just maybe show a thank you message or disable further changes
      alert("Thank you for your feedback!");
    } else {
      setShowError(true);
    }
  };

  const handleContinueShopping = () => {
    setCart([]); // Clear the cart here
    navigate('/');
  };

  return (
    <Container className="py-5">
      <CheckoutSteps step={3} />
      <div className="confirmation-container">
        <h2 className="text-center mb-4">✅ Order Successful!</h2>
        <p className="text-center text-muted">Thank you for shopping with Ballerz! Before you go, please take a moment to rate your experience.</p>

        {surveyQuestions.map((question, idx) => (
          <div key={idx} className="survey-question">
            {question}
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((val) => (
                <FaStar
                  key={val}
                  className={val <= responses[idx] ? 'star active' : 'star'}
                  onClick={() => handleStarClick(idx, val)}
                />
              ))}
            </div>
          </div>
        ))}

        {showError && (
          <p className="text-danger mt-3">
            Please rate all the questions before submitting.
          </p>
        )}

        <div className="d-flex flex-column align-items-center">
          {/* Submit Button (centered) */}
          <Button
            variant="success"
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 rounded-pill fw-semibold"
          >
            Submit Survey
          </Button>

          {/* Continue Shopping (bottom right) */}
          <div className="w-100 d-flex justify-content-end mt-4">
            <Button
              variant="outline-primary"
              onClick={handleContinueShopping}  // <-- clear cart & navigate
              className="px-4 py-2 rounded-pill fw-semibold"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ConfirmationPage;
