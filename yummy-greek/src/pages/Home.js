import React from "react";
import DishesList from "../components/DishesList";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <main>
      <Categories />
      <DishesList />
    </main>
  );
};

export default Home;
