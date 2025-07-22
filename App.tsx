import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './components/Home';
import About from './components/About';
import CoursesPage from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Contact from './components/Contact';
import GalleryPage from './components/GalleryPage';
import SmoothScroll from './components/SmoothScroll';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <div className="bg-slate-50 text-slate-700">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/course/:courseId" element={<CourseDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                    </Routes>
                </main>
                <Footer />
                <FloatingWhatsApp />
                <SmoothScroll />
            </div>
        </HashRouter>
    );
};

export default App;