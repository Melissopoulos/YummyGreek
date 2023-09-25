import React, { useState, useEffect } from "react";
import Dish from "./Dish";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const DishesList = () => {
  const { loading, dishes } = useGlobalContext();

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
