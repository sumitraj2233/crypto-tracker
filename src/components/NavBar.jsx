import React, { useState } from "react";
import { Link } from "react-router-dom";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import HomeIcon from "@mui/icons-material/Home";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="mobile-header">
        <div className="logo">
          <CurrencyBitcoinIcon fontSize="larger" />
          <p>Crypto Tracker</p>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`menus ${menuOpen ? "open" : ""}`}>
        <div className="menu-item">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <HomeIcon />
            Home
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/cryptocurrencies" onClick={() => setMenuOpen(false)}>
            <AutoGraphIcon />
            Cryptocurrencies
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/exchanges" onClick={() => setMenuOpen(false)}>
            <PriceChangeIcon />
            Exchanges
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/news" onClick={() => setMenuOpen(false)}>
            <LightbulbIcon />
            News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
