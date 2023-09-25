import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "http://localhost:8000/dishes/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [showAllergens, setShowAllergens] = useState(false); // State to toggle allergen display

  //fetch data
  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setDishes(data);
      // Extract all allergens into an Array
      const allergensArray = [
        // Use Set in order to have unique allergens into the array
        ...new Set(
          data
            .map((dish) => {
              // First if in case there is no allergen array and some of the allergens are on the tags array
              if (Array.isArray(dish.tags)) {
                const alergen = dish.tags.filter((item) =>
                  item.startsWith("contains")
                );
                return alergen;
                // In case there is allergens array inside the tags
              } else {
                return dish.tags.allergens;
              }
            })
            // Use reduce in order to combine the arrays into one array of allergens
            .reduce(
              (accumulator, currentValue) => [...accumulator, ...currentValue],
              []
            )
        ),
      ];
      setAllergens(allergensArray);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const displayAllergens = () => {
    setShowAllergens(true); // Show allergens
  };
  const filterByAllergen = (allergen) => {
    const filteredDishes = dishes.filter((dish) => {
      if (dish.tags.allergens && dish.tags.allergens.includes(allergen))
        return true;
      if (Array.isArray(dish.tags) && dish.tags.includes(allergen)) return true;
      else {
        return false;
      }
    });
    setDishes(filteredDishes);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        dishes,
        allergens,
        showAllergens,
        displayAllergens,
        filterByAllergen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
