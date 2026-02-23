import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RateProvider } from './context/RateContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BottomNav from './components/BottomNav';
import Ticker from './components/Ticker';
import RatesPage from './pages/RatesPage';
import AlertsPage from './pages/AlertsPage';
import VideosPage from './pages/VideosPage';
import AdminPage from './pages/AdminPage';

const Home = () => <Hero />;

function App() {
  return (
    <RateProvider>
      <Router>
        <main className="min-h-screen Selection:bg-gold-400 Selection:text-magenta-800">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rates" element={<RatesPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>

          <BottomNav />
          <Ticker />
        </main>
      </Router>
    </RateProvider>
  );
}

export default App;
