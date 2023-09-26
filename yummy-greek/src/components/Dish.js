import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Dish = ({ id, name, image, description, price }) => {
  const { basket, setBasket, dishes } = useGlobalContext();
  const [addToBasket, setAddToBasket] = useState(false);
  // Function to add/remove a dish from the basket
  const toggleBasket = (id) => {
    setAddToBasket(!addToBasket);
    const isDishInBasket = basket.some((item) => item.id === id);
    if (isDishInBasket) {
      // If the dish is in the basket, remove it
      const updatedBasket = basket.filter((item) => item.id !== id);
      setBasket(updatedBasket);
    } else {
      // If the dish is not in the basket, add it
      const newDish = dishes.filter((item) => item.id === id);
      setBasket([...basket, ...newDish]);
    }
  };
  //addToBasket ? "Remove from Basket" : "Add to Basket"
  return (
    <article className="dish">
      <div>
        <img src={image} alt={name} />
      </div>
      <div className="dish-footer">
        <h4>{price}€</h4>
        <p>{description}</p>
        <Link to={`dishes/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
        <button onClick={() => toggleBasket(id)}>
          {addToBasket ? "Remove from Basket" : "Add to Basket"}
        </button>
      </div>
    </article>
  );
};

export default Dish;
