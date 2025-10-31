import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function RecipeFinder() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter at least one ingredient!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }

    setLoading(false);
  };

  return (
    <div
      className="recipe-finder"
      style={{
        backgroundImage: "url(/recipe.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div className="app">
        <h1>🍽️ AI-Powered Recipe Recommender</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter ingredients (e.g., chicken, tomato)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Find Recipes</button>
        </div>

        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="recipe-list">
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <div
                  key={r.idMeal}
                  className="recipe-card"
                  onClick={() => navigate(`/recipe/${r.idMeal}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={r.strMealThumb} alt={r.strMeal} />
                  <h3>{r.strMeal}</h3>
                </div>
              ))
            ) : (
              <p>No recipes found. Try searching something else!</p>
            )}
          </div>
        )}
      </div>
    </div> // ✅ this was missing
  );
}

export default RecipeFinder;
