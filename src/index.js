import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider
import { AuthProvider } from "./context/authContext"; // ✅ Import AuthProvider (if authentication is used)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>  {/* ✅ Wrap in AuthProvider (if applicable) */}
      <CartProvider> {/* ✅ Wrap in CartProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
