import React from "react";
import { useGlobalContext } from "../context";

const Categories = () => {
  const { allergens, showAllergens, displayAllergens, filterByAllergen } =
    useGlobalContext();
  console.log(allergens);

  return (
    <div>
      <button>Dietary Preferences</button>
      <button>Price Range</button>
      <button onClick={displayAllergens}>Allergens</button>

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
    </div>
  );
};

export default Categories;
