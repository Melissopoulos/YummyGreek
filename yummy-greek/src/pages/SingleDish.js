import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

const SingleDish = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dish, setDish] = useState(null);

  const getDish = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/dishes/${id}`);
      const data = await response.json();
      setDish(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDish();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!dish) {
    return <h2 className="section-title">no dish to display</h2>;
  } else {
    const { name, image, description, price, ingredients, tags } = dish;
    //Create newTags array. If tags is array then newTags = tags, else newTags = dietaryPreferences + allergens combined
    const newTags = Array.isArray(dish.tags)
      ? tags
      : [...tags.dietaryPreferences, ...tags.allergens];

    return (
      <section className="section dish-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="dish">
          <img src={image} alt={name}></img>
          <div className="dish-info">
            <p>
              <span className="dish-data">name :</span> {name}
            </p>
            <p>
              <span className="dish-data">price :</span> {price} €
            </p>
            <p>
              <span className="dish-data">info :</span> {description}
            </p>
            <p>
              <span className="dish-data">ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
            <p>
              <span className="dish-data">
                diet preferences and allergens :
              </span>
              {newTags.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleDish;
