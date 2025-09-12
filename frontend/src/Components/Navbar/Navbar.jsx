import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Contexts/ShopContext';
import nav_dropdown from '../Assets/arrow-downs.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [selectedOption, setSelectedOption] = useState("More"); // ✅ fixed typo
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    // Navigate to a new route based on the option
    switch (value) {
      case "Watch":
        navigate("/watch");
        break;
      case "Shoes":
        navigate("/shoes");
        break;
      case "Socks":
        navigate("/socks");
        break;
      case "Belt":
        navigate("/belt");
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar">
      {/* Logo section */}
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      {/* Dropdown toggle icon */}
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="menu"
      />

      {/* Navigation menu */}
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: 'none' }} to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: 'none' }} to="/mens">Men</Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: 'none' }} to="/womens">Women</Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      {/* Extra dropdown */}
      <div className="drop-down">
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="More">More</option>
          <option value="Watch">Watch</option>
          <option value="Shoes">Shoes</option>
          <option value="Socks">Socks</option>
          <option value="Belt">Belt</option>
        </select>
      </div>

      {/* Login + Cart */}
      <div className="nav-login-cart">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div> {/* ✅ call function */}
      </div>
    </div>
  );
};

export default Navbar;
