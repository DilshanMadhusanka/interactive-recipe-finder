import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import RecipeList from '../components/RecipeList.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { searchRecipesByName, searchRecipesByIngredient } from '../services/api.js';
import { motion } from 'motion/react';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Initial load 
  useEffect(() => {
    handleSearch('chicken', 'name');
  }, []);

  const handleSearch = async (query, type) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      let results = [];
      if (type === 'name') {
        results = await searchRecipesByName(query);
      } else {
        results = await searchRecipesByIngredient(query);
      }
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight">
          Find Your Next <span className="text-emerald-600 italic">Favorite Meal</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          Search through thousands of recipes by name or ingredients. Cooking has never been easier.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </motion.div>
  );
};

export default Home;
