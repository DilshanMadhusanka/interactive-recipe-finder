import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeDetails } from '../services/api.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { Heart, ChevronLeft, Globe, Tag, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favorite = isFavorite(id);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getRecipeDetails(id);
        if (data) {
          setRecipe(data);
        } else {
          setError('Recipe not found.');
        }
      } catch (err) {
        setError('Failed to load recipe details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(recipe);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure ? measure.trim() : ''
      });
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-stone-500 hover:text-emerald-600 transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image and Meta */}
        <div className="space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal}
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={toggleFavorite}
              className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-md shadow-xl transition-all ${
                favorite 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/90 text-stone-600 hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart size={24} className={favorite ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
              <Tag size={18} className="text-emerald-600" />
              <span className="font-medium text-stone-700">{recipe.strCategory}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
              <Globe size={18} className="text-emerald-600" />
              <span className="font-medium text-stone-700">{recipe.strArea}</span>
            </div>
            {recipe.strTags && (
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
                <Clock size={18} className="text-emerald-600" />
                <span className="font-medium text-stone-700">Quick Prep</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-stone-900 mb-4 leading-tight">{recipe.strMeal}</h1>
            <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
              Ingredients
              <span className="text-sm font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                {ingredients.length} items
              </span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-50 shadow-sm group hover:border-emerald-100 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                  <span className="text-stone-700 font-medium">{item.name}</span>
                  <span className="text-stone-400 text-sm ml-auto italic">{item.measure}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4">Instructions</h2>
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm leading-relaxed text-stone-600 whitespace-pre-line">
              {recipe.strInstructions}
            </div>
          </section>

          {recipe.strYoutube && (
            <a 
              href={recipe.strYoutube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-rose-600/20"
            >
              Watch Video Tutorial
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
