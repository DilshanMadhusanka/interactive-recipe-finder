import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import RecipeList from '../components/RecipeList.jsx';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-4 bg-rose-50 rounded-full text-rose-500 mb-2">
          <Heart size={32} className="fill-current" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
          Your <span className="text-rose-500 italic">Favorites</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          All your saved recipes in one place. Ready to cook?
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
          <p className="text-xl text-stone-400">You haven't saved any recipes yet.</p>
          <p className="text-stone-400 mt-2">Go back to home and find something delicious!</p>
        </div>
      ) : (
        <RecipeList recipes={favorites} />
      )}
    </motion.div>
  );
};

export default Favorites;
