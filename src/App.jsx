import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
