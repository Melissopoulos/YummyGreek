import React from "react";
import { Link } from "react-router-dom";

const Dish = ({ id, name, image, description, price }) => {
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
      </div>
    </article>
  );
};

export default Dish;
