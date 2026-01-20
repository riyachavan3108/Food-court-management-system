import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css"; // ✅ Ensure Checkout.css is styled properly

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // 📝 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validate Inputs
  const isFormValid = () => {
    const { name, email, address, phone } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits

    return (
      name.trim() !== "" &&
      emailRegex.test(email) &&
      address.trim() !== "" &&
      phoneRegex.test(phone)
    );
  };

  // 🛍️ Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Place Order Function
  const handleOrder = () => {
    if (!isFormValid()) {
      alert("Please enter valid details before placing the order.");
      return;
    }

    // 🛒 Simulating Order Processing
    alert(`🎉 Order placed successfully! 🛍️ Total: ₹${totalPrice}`);
    
    // 🗑️ Clear cart after order
    setCart([]);

    // 🔄 Redirect to Home
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.itemName} - ₹{item.price}</li>
          ))}
        </ul>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
      </div>

      {/* 📋 User Details Form */}
      <div className="checkout-form">
        <h3>Delivery Details</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button onClick={handleOrder} disabled={!isFormValid()}>
          ✅ Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
