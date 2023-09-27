import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Basket = () => {
  const { basket } = useGlobalContext();
  // Function to calculate the total price
  const calculateTotalPrice = () => {
    // Calculate the sum of prices of all dishes in the basket
    const totalPrice = basket.reduce((total, dish) => total + dish.price, 0);
    return totalPrice.toFixed(2); // Format to two decimal places
  };
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
      <p>Total Price: {calculateTotalPrice()}€</p>
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
    </section>
  );
};

export default Basket;
