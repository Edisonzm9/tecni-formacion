import React, { useState, useMemo } from 'react';
import Gallery from './Gallery';
import { GALLERY_IMAGES } from '../constants';
import { ChevronDownIcon } from './Icons';

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos los cursos' },
    { id: 'electrica', name: 'Área Eléctrica' },
    { id: 'mecanica', name: 'Área Mecánica' },
    { id: 'formacion', name: 'Área de Formación' },
    { id: 'automatizacion', name: 'Automatización' }
  ];

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'todos') {
      return GALLERY_IMAGES;
    }

    const categoryMap: { [key: string]: string[] } = {
      'electrica': ['electricidad-residencial', 'luminotecnia-variables-electricas', 'redes-electricas-liniero', 'diagnostico-sistemas-electricos-vehiculo'],
      'mecanica': ['diagnostico-sistemas-automotrices', 'tecnico-soldadura-electrica'],
      'formacion': ['arquitectura-aprendizaje', 'evaluacion-competencias', 'formacion-instructores'],
      'automatizacion': ['sistemas-automatizados']
    };

    const courseIds = categoryMap[selectedCategory] || [];
    return GALLERY_IMAGES.filter(image => 
      courseIds.some(id => image.alt.toLowerCase().includes(id.split('-')[0]))
    );
  }, [selectedCategory]);

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'Todos los cursos';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Galería de Cursos
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explora visualmente nuestros programas de formación técnica y certificación profesional
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-slate-600 font-medium">Filtrar por:</span>
              
              {/* Mobile Filter Dropdown */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-300"
                >
                  <span>{selectedCategoryName}</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors duration-300 ${
                          selectedCategory === category.id ? 'bg-orange-50 text-orange-600' : 'text-slate-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Filter Buttons */}
              <div className="hidden md:flex items-center gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-slate-600">
              <span className="font-medium">{filteredImages.length}</span> 
              <span className="ml-1">
                {filteredImages.length === 1 ? 'imagen' : 'imágenes'} encontrada{filteredImages.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery 
        images={filteredImages}
        title={selectedCategoryName}
        subtitle={`Explora nuestros cursos de ${selectedCategoryName.toLowerCase()}`}
      />

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-heading">
              ¿Interesado en nuestros cursos?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Cada imagen representa un programa de formación diseñado para desarrollar habilidades técnicas 
              específicas y prepararte para el mercado laboral actual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="cta-button inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Ver todos los cursos
              </a>
              <a
                href="/contact"
                className="cta-button-secondary inline-flex items-center justify-center px-8 py-3 text-orange-600 font-semibold rounded-lg transition-all duration-300"
              >
                Solicitar información
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage; 