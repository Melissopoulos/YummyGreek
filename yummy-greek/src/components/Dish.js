import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Dish = ({ id, name, image, description, price }) => {
  const { addToBasket } = useGlobalContext();

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
        <button onClick={() => addToBasket(id)}>Add to Basket</button>
      </div>
    </article>
  );
};

export default Dish;
