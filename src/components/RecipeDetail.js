import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setRecipe(data.meals[0]);
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading recipe details...</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Category: {recipe.strCategory}</h3>
      <h4>Area: {recipe.strArea}</h4>

      <p>{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="yt-link"
        >
          ▶ Watch on YouTube
        </a>
      )}

      <br />
      <Link to="/" className="back-btn">
        ← Back to Search
      </Link>
    </div>
  );
}

export default RecipeDetail;
