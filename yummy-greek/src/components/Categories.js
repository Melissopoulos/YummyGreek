import React from "react";
import { useGlobalContext } from "../context";

const priceRanges = [
  [0, 10], // Under 10€
  [10, 20], // 10€ - 20€
  [20, 30], // 20€ - 30€
  [30, 1000], // Over 30€
];

const Categories = () => {
  const {
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
  } = useGlobalContext();
  console.log(allergens);

  return (
    <div>
      <button onClick={displayAllergens}>Allergens</button>
      <button onClick={displayDietaryPreferences}>Dietary Preferences</button>
      <button onClick={displayPriceRange}>Price Range</button>

      {showAllergens && (
        <div>
          <h2>Allergens:</h2>
          <ul>
            {allergens.map((allergen, index) => (
              <li key={index} onClick={() => filterByAllergen(allergen)}>
                {allergen}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDietaryPreferences && (
        <div>
          <h2>DietaryPreferences:</h2>
          <ul>
            {dietaryPreferences.map((dietaryPreferences, index) => (
              <li
                key={index}
                onClick={() => filterByDietaryPreferences(dietaryPreferences)}
              >
                {dietaryPreferences}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPriceRange && (
        <div>
          <h2>PriceRange:</h2>
          <ul>
            {priceRanges.map((priceRange, index) => {
              const [minPrice, maxPrice] = priceRange;
              return (
                <li
                  key={index}
                  onClick={() => filterByPriceRange(minPrice, maxPrice)}
                >
                  {`${minPrice} - ${maxPrice} €`}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;