import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Basket = () => {
  const { basket } = useGlobalContext();

  return (
    <section>
      <div>
        <h2>Your Basket</h2>
        <ul className="basket-ul">
          {basket.map((item, index) => (
            <li className="basket-li" key={index}>
              {item.name} - {item.price} €
            </li>
          ))}
        </ul>
      </div>
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
    </section>
  );
};

export default Basket;
