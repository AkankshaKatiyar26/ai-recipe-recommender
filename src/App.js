import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeFinder from "./components/RecipeFinder";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeFinder />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
