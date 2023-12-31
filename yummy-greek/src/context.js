import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "http://localhost:8000/dishes/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]); // State to keep always all the dishes

  const [allergens, setAllergens] = useState([]);
  const [showAllergens, setShowAllergens] = useState(false); // State to toggle allergen display
  const [showAllergensItem, setShowAllergensItem] = useState(false); //State to toggle allergen display when the filterByAllergen is called

  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [showDietaryPreferences, setShowDietaryPreferences] = useState(false); // State to toggle dietaryPreferences display
  const [showDietaryPreferencesItem, setShowDietaryPreferencesItem] =
    useState(false); //State to toggle DietaryPreference display when the filterByDietaryPreference is called

  const [showPriceRange, setShowPriceRange] = useState(false); // State to toggle PriceRange display
  const [showPriceRangeItem, setShowPriceRangeItem] = useState(false); //State to toggle PriceRange display when the filterByPriceRange is called

  const [basket, setBasket] = useState([]); //State to keep the dishes into a basket

  const [isSelected, setIsSelected] = useState(false); //State to trigger useEffect when we click the same Category

  //fetch data
  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDishes(data);
      setAllDishes(data);
      // Extract all allergens into an Array
      const allergensArray = [
        // Use Set in order to have unique allergens into the array
        ...new Set(
          data
            .map((dish) => {
              // First if in case there is no allergens array and some of the allergens are on the tags array
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
  //useEffect to fetch the data
  useEffect(() => {
    fetchDishes();
  }, []);
  //useEffect to display all the dishes again when a new filter is selected
  useEffect(() => {
    setDishes(allDishes);
  }, [showAllergens, showDietaryPreferences, showPriceRange, isSelected]);

  // Show allergens
  const displayAllergens = () => {
    setShowAllergens(true);
    setShowAllergensItem(true);
    setShowDietaryPreferences(false);
    setShowPriceRange(false);
    setShowDietaryPreferencesItem(false);
    setShowPriceRangeItem(false);
    setIsSelected(!isSelected);
  };
  // Show dietaryPreferences
  const displayDietaryPreferences = () => {
    setShowDietaryPreferences(true);
    setShowDietaryPreferencesItem(true);
    setShowPriceRange(false);
    setShowAllergens(false);
    setShowPriceRangeItem(false);
    setShowAllergensItem(false);
    setIsSelected(!isSelected);
  };
  // Show priceRange
  const displayPriceRange = () => {
    setShowPriceRange(true);
    setShowPriceRangeItem(true);
    setShowAllergens(false);
    setShowDietaryPreferences(false);
    setShowDietaryPreferencesItem(false);
    setShowAllergensItem(false);
    setIsSelected(!isSelected);
  };

  // Function to filter the dishes to the allergens
  const filterByAllergen = (allergen) => {
    setShowAllergensItem(false);
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

  // Function to filter the dishes to the dietary preferences
  const filterByDietaryPreferences = (dietaryPreferences) => {
    setShowDietaryPreferencesItem(false);
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

  // Function to filter the dishes to the price range
  const filterByPriceRange = (minPrice, maxPrice) => {
    setShowPriceRangeItem(false);
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
        showAllergensItem,
        showDietaryPreferencesItem,
        showPriceRangeItem,
        allDishes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//Create a hook useGlobalContext in order to use it everywhere in the project
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
