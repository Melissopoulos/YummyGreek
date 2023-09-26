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

  const [showPriceRange, setShowPriceRange] = useState(false); // State to toggle PriceRange display

  const [basket, setBasket] = useState([]);

  //fetch data
  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
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

      // Extract all dietaryPreferences into an Array
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const displayAllergens = () => {
    setShowAllergens(true); // Show allergens
  };

  // Function to filter the dishes to the allergens
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

  // Function to filter the dishes to the dietary preferences
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

  // Show priceRange
  const displayPriceRange = () => {
    setShowPriceRange(true);
  };

  // Function to filter the dishes to the price range
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
        setDishes,
        allergens,
        showAllergens,
        displayAllergens,
        filterByAllergen,
        dietaryPreferences,
        showDietaryPreferences,
        displayDietaryPreferences,
        filterByDietaryPreferences,
        showPriceRange,
        displayPriceRange,
        filterByPriceRange,
        basket,
        setBasket,
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
