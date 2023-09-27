import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const { setDishes, allDishes } = useGlobalContext();

  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <h1>YummyGreek</h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              onClick={() => {
                setDishes(allDishes);
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/basket">Basket</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
