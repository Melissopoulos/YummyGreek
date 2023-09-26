import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "http://localhost:8000/dishes/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState([]);

  const [allergens, setAllergens] = useState([]);
  const [showAllergens, setShowAllergens] = useState(false); // State to toggle allergen display

  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [showDietaryPreferences, setShowDietaryPreferences] = useState(false); // State to toggle dietaryPreferences display

  const [price, setPrice] = useState([]);
  const [showPriceRange, setShowPriceRange] = useState(false); // State to toggle PriceRange display

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
                const allergen = dish.tags.filter((item) =>
                  item.startsWith("contains")
                );
                return allergen;
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

      // Extract all dietaryPrefs into an Array
      const dietaryPreferencesArray = [
        // Use Set in order to have unique dietaryPreferences into the array
        ...new Set(
          data
            .map((dish) => {
              // First if in case there is no dietaryPreferences array and some of the dietaryPreferences are on the tags array
              if (Array.isArray(dish.tags)) {
                const dietaryPreferences = dish.tags.filter(
                  (item) => !item.startsWith("contains")
                );
                return dietaryPreferences;
                // In case there is allergens array inside the tags
              } else {
                return dish.tags.dietaryPreferences;
              }
            })
            // Use reduce in order to combine the arrays into one array of dietaryPrefs
            .reduce(
              (accumulator, currentValue) => [...accumulator, ...currentValue],
              []
            )
        ),
      ];
      setDietaryPreferences(dietaryPreferencesArray);

      // Extract all price into an Array
      const priceArray = data.map((dish) => dish.range);
      setPrice(priceArray);
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

  const displayDietaryPreferences = () => {
    setShowDietaryPreferences(true); // Show dietaryPreferences
  };
  const filterByDietaryPreferences = (dietaryPreferences) => {
    const filteredDishes = dishes.filter((dish) => {
      if (
        dish.tags.dietaryPreferences &&
        dish.tags.dietaryPreferences.includes(dietaryPreferences)
      )
        return true;
      if (Array.isArray(dish.tags) && dish.tags.includes(dietaryPreferences))
        return true;
      else {
        return false;
      }
    });
    setDishes(filteredDishes);
  };

  const displayPriceRange = () => {
    setShowPriceRange(true); // Show priceRange
  };

  const filterByPriceRange = (minPrice, maxPrice) => {
    const filteredDishes = dishes.filter(
      (dish) => dish.price >= minPrice && dish.price <= maxPrice
    );
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
        dietaryPreferences,
        showDietaryPreferences,
        displayDietaryPreferences,
        filterByDietaryPreferences,
        price,
        showPriceRange,
        displayPriceRange,
        filterByPriceRange,
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
