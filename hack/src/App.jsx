import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import WatchlistPage from './pages/WatchlistPage';
import ComparisonPage from './pages/ComparisonPage';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/comparison" element={<ComparisonPage />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;