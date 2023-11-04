import React, { useState } from "react";
import Main from "./Components/Main";
import "./Components/style.css";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/cart/AddToCart";
import ResponsiveAppBar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./Components/Books/Books";
import Authors from "./Components/Author/AuthorList";
import UserProfile from "./Components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";

function App() {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([
      ...cartItems,
      { title: item.volumeInfo.title, price: item.saleInfo.listPrice.amount },
    ]);
  };

  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };
  const domain = process.env.REACT_APP_AUTHO_DOMAIN;
  console.log("Koca: domain2 ", domain);

  return (
    <>
      <Router>
        <div>
          <ResponsiveAppBar />
          {user ? (
            <Routes>
              <Route path="/" element={<Main addToCart={addToCart} />} />
              <Route
                path="/cart"
                element={<Cart cartItems={cartItems} removeItem={removeItem} />}
              />
              <Route path="/books" element={<Books />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          ) : (
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: 24,
              }}
            >
              Please login before using
            </Typography>
          )}
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
