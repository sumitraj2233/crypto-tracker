import React from "react";
import NavBar from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

import Cryptocurrencies from "./components/Cryptocurrencies";
import Homee from "./components/Homee";
import News from "./components/News";
import Exchanges from "./components/Exchanges";
import CryptoDetails from "./components/CryptoDetails";

const App = () => {
  return (
    <div className="app">
      <div className="sidebar">
        <NavBar />
      </div>
      <div className="content">
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Homee />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/news" element={<News />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/exchanges" element={<Exchanges />} />
          </Routes>
        </div>
        <div className="footer">
          <p>Crypto tracker</p>
          <p>Copyright 2025 All Rights Reserved</p>
          <div className="footerLinks">
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
