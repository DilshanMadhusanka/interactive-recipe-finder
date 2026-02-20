import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Utensils, Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600">
          <Utensils size={24} />
          <span>RecipeFinder</span>
        </Link>
        
        <div className="flex gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-1 font-medium transition-colors ${isActive ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-500'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `flex items-center gap-1 font-medium transition-colors ${isActive ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-500'}`
            }
          >
            {({ isActive }) => (
              <>
                <Heart size={18} className={isActive ? 'fill-emerald-600' : ''} />
                Favorites
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
