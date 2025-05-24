import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import { ImageHistoryProvider } from './context/ImageHistoryContext';

function App() {
  return (
    <ImageHistoryProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ImageHistoryProvider>
  );
}

export default App;