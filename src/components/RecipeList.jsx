import React from 'react';
import RecipeCard from './RecipeCard.jsx';

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-medium text-stone-400 italic">No recipes found. Try searching for something else!</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
