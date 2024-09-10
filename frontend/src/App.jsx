import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";

import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
const App = () => {
  const [login,setLogin]=useState(false)
  return (
    <>
    {login?<LoginPopup setLogin={setLogin}/>:<></>}
      <div className="app">
        <Navbar setLogin={setLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
