import React from 'react';
import { Container, Table, Button, Image } from 'react-bootstrap';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';

function CartPage({ cart, setCart }) {
  const navigate = useNavigate();

  // Aggregate products by id and quantity
  const aggregatedItems = cart.reduce((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Handlers
  const handleDecrease = (id) => {
    const indexToRemove = cart.findIndex((item) => item.id === id);
    if (indexToRemove === -1) return;

    const newCart = [...cart];
    newCart.splice(indexToRemove, 1);
    setCart(newCart);
  };

  const handleIncrease = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleRemoveItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const total = aggregatedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container className="py-4">
      <CheckoutSteps step={1} />
      <h2 className="text-center mb-4">Your Cart</h2>

      {aggregatedItems.length === 0 ? (
        <p className="text-center">Your cart is currently empty.</p>
      ) : (
        <>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aggregatedItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Image src={item.image} width="60" height="60" rounded />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDecrease(item.id)}
                    >
                      −
                    </Button>

                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <h5>Total: ${total.toFixed(2)}</h5>
            <Button variant="success" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default CartPage;
