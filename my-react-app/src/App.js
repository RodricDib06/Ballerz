// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './BallerzNavbar';
import Home from './BallerzHome';
import Basketball from './Basketball';
import Volleyball from './Volleyball';
import Soccer from './Soccer';
import SearchResults from './SearchResults';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import CheckoutForm from './CheckoutForm';      
import ConfirmationPage from './ConfirmationPage'; 

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <Router>
      <Navbar cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/volleyball" element={<Volleyball />} />
        <Route path="/soccer" element={<Soccer />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<CheckoutForm />} />            
        <Route path="/confirmation" element={<ConfirmationPage cart={cart} setCart={setCart} />} />  
      </Routes>
    </Router>
  );
}

export default App;
