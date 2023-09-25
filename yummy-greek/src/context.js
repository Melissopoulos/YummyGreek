import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "http://localhost:8000/dishes/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
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

  return (
    <AppContext.Provider value={{ loading, dishes }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
