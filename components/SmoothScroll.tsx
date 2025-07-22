import React, { useEffect, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from './Icons';

interface ScrollTarget {
  id: string;
  label: string;
  element: HTMLElement;
}

const SmoothScroll: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollTargets, setScrollTargets] = useState<ScrollTarget[]>([]);

  useEffect(() => {
    // Obtener todos los elementos de navegación
    const getScrollTargets = (): ScrollTarget[] => {
      const targets: ScrollTarget[] = [];
      
      // Elementos principales de la página
      const mainSections = [
        { id: 'header', label: 'Inicio' },
        { id: 'hero', label: 'Bienvenida' },
        { id: 'areas', label: 'Áreas de Formación' },
        { id: 'why-us', label: 'Por Qué Elegirnos' },
        { id: 'cta', label: 'Llamado a la Acción' },
        { id: 'about', label: 'Sobre Nosotros' },
        { id: 'courses', label: 'Nuestros Cursos' },
        { id: 'contact', label: 'Contacto' },
        { id: 'footer', label: 'Pie de Página' }
      ];

      mainSections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          targets.push({
            id: section.id,
            label: section.label,
            element
          });
        }
      });

      // Buscar secciones adicionales por clases específicas
      const additionalSections = document.querySelectorAll('section[id], .scroll-section');
      additionalSections.forEach((element, index) => {
        const id = element.id || `section-${index}`;
        const label = element.getAttribute('data-label') || `Sección ${index + 1}`;
        
        if (!targets.find(t => t.id === id)) {
          targets.push({
            id,
            label,
            element: element as HTMLElement
          });
        }
      });

      return targets.sort((a, b) => {
        const aRect = a.element.getBoundingClientRect();
        const bRect = b.element.getBoundingClientRect();
        return aRect.top - bRect.top;
      });
    };

    const targets = getScrollTargets();
    setScrollTargets(targets);

    // Mostrar botones después de un delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let currentIndex = 0;
      scrollTargets.forEach((target, index) => {
        const elementTop = target.element.offsetTop;
        const elementBottom = elementTop + target.element.offsetHeight;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          currentIndex = index;
        }
      });
      
      setCurrentSection(currentIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTargets]);

  const scrollToSection = (index: number) => {
    if (scrollTargets[index]) {
      const target = scrollTargets[index];
      const headerHeight = 80; // Altura aproximada del header
      const targetPosition = target.element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setCurrentSection(index);
    }
  };

  const scrollToNext = () => {
    const nextIndex = (currentSection + 1) % scrollTargets.length;
    scrollToSection(nextIndex);
  };

  const scrollToPrev = () => {
    const prevIndex = currentSection === 0 ? scrollTargets.length - 1 : currentSection - 1;
    scrollToSection(prevIndex);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setCurrentSection(0);
  };

  if (scrollTargets.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col items-center gap-2">
      {/* Botón de navegación hacia arriba */}
      <button
        onClick={scrollToPrev}
        className="w-12 h-12 bg-slate-800 hover:bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        title="Sección anterior"
      >
        <ChevronUpIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Indicador de sección actual */}
      <div className="bg-white rounded-lg shadow-lg px-3 py-2 min-w-[120px] text-center">
        <div className="text-xs text-slate-500 mb-1">Sección</div>
        <div className="text-sm font-semibold text-slate-800">
          {scrollTargets[currentSection]?.label || 'Navegando...'}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {currentSection + 1} de {scrollTargets.length}
        </div>
      </div>

      {/* Botón de navegación hacia abajo */}
      <button
        onClick={scrollToNext}
        className="w-12 h-12 bg-slate-800 hover:bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        title="Siguiente sección"
      >
        <ChevronDownIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Botón para ir al inicio */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        title="Ir al inicio"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Indicador de progreso */}
      <div className="w-1 h-16 bg-slate-200 rounded-full relative">
        <div 
          className="absolute bottom-0 w-full bg-orange-500 rounded-full transition-all duration-500"
          style={{ 
            height: `${((currentSection + 1) / scrollTargets.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default SmoothScroll; 