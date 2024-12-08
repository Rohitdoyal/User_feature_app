import React, { useState } from "react";
import axios from "axios";
import Profile from "../components/Profile.jsx";

const RecipeIdeas = () => {
  const user = { name: "Taylor", occupation: "Busy Professional", email: "taylor@recipes.com" };
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    setRecipes(res.data.meals || []);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recipe Ideas</h2>
      <Profile user={user} />
      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter ingredient..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={fetchRecipes} className="btn ml-2">Get Recipes</button>
        {recipes.length > 0 && (
          <ul className="mt-4">
            {recipes.map((recipe) => (
              <li key={recipe.idMeal} className="border p-2 rounded mb-2">
                {recipe.strMeal}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeIdeas;
