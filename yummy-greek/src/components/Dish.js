import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Dish = ({ id, name, image, description, price }) => {
  const { basket, setBasket, dishes } = useGlobalContext();
  const [addToBasket, setAddToBasket] = useState(false); //State to change the display of the toggleBasket button
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
  //useEffect in order to keep the display of the button when the dish rerenders
  useEffect(() => {
    const isDishInBasket = basket.some((item) => item.id === id);
    if (isDishInBasket) {
      setAddToBasket(true);
    }
  }, []);

  return (
    <div className="dish">
      <div>
        <img src={image} alt={name} />
      </div>
      <div className="dish-footer">
        <h4>{price}€</h4>
        <p>{description}</p>
        <Link to={`dishes/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
        <button
          className="btn btn-sec btn-details"
          onClick={() => toggleBasket(id)}
        >
          {addToBasket ? "Remove from Basket" : "Add to Basket"}
        </button>
      </div>
    </div>
  );
};

export default Dish;
