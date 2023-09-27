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
    showPriceRange,
    displayPriceRange,
    filterByPriceRange,
    showAllergensItem,
    showDietaryPreferencesItem,
    showPriceRangeItem,
  } = useGlobalContext();

  return (
    <div className="categories">
      <button
        className="btn btn-primary btn-details"
        onClick={displayAllergens}
      >
        Allergens
      </button>
      <button
        className="btn btn-primary btn-details"
        onClick={displayDietaryPreferences}
      >
        Dietary Preferences
      </button>
      <button
        className="btn btn-primary btn-details"
        onClick={displayPriceRange}
      >
        Price Range
      </button>

      {showAllergens && showAllergensItem && (
        <div>
          <ul className="categories-ul">
            {allergens.map((allergen, index) => (
              <li
                className="categories-li"
                key={index}
                onClick={() => filterByAllergen(allergen)}
              >
                {allergen}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDietaryPreferences && showDietaryPreferencesItem && (
        <div>
          <ul className="categories-ul">
            {dietaryPreferences.map((dietaryPreferences, index) => (
              <li
                className="categories-li"
                key={index}
                onClick={() => filterByDietaryPreferences(dietaryPreferences)}
              >
                {dietaryPreferences}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPriceRange && showPriceRangeItem && (
        <div>
          <ul className="categories-ul">
            {priceRanges.map((priceRange, index) => {
              const [minPrice, maxPrice] = priceRange;
              return (
                <li
                  className="categories-li"
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
