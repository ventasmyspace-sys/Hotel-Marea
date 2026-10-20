import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/nosotros" element={<AboutPage />} />
                <Route path="/galeria" element={<GalleryPage />} />
                <Route path="/contacto" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;
