import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { motion } from 'motion/react';

const RecipeCard = ({ recipe }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(recipe.idMeal);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <Link to={`/recipe/${recipe.idMeal}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              favorite 
                ? 'bg-rose-500 text-white shadow-lg' 
                : 'bg-white/80 text-stone-600 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart size={20} className={favorite ? 'fill-current' : ''} />
          </button>
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-lg text-stone-800 line-clamp-1 mb-1 group-hover:text-emerald-600 transition-colors">
            {recipe.strMeal}
          </h3>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            {recipe.strCategory && (
              <span className="bg-stone-100 px-2 py-0.5 rounded-md">{recipe.strCategory}</span>
            )}
            {recipe.strArea && (
              <span className="bg-stone-100 px-2 py-0.5 rounded-md">{recipe.strArea}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
