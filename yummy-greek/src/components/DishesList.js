import React, { useState, useEffect } from "react";
import Dish from "./Dish";
import Loading from "./Loading";
const url = "http://localhost:8000/dishes/";

const DishesList = () => {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setDishes(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (dishes.length < 1) {
    return (
      <h2 className="section-title">no dishes matched your search criteria</h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">dishes</h2>
      <div className="dishes-center">
        {dishes.map((dish) => {
          return <Dish key={dish.id} {...dish} />;
        })}
      </div>
    </section>
  );
};

export default DishesList;
