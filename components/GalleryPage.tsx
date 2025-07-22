import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from './Icons';

// Imágenes de la galería - completamente independientes de los cursos
const GALLERY_IMAGES = [
  {
    id: '1',
    src: '/assets/gallery/p1.jpg',
    alt: 'Trabajo en equipo técnico',
    title: 'Colaboración y Excelencia',
    description: 'Nuestros estudiantes trabajan en equipo para desarrollar proyectos técnicos innovadores.'
  },
  {
    id: '2',
    src: '/assets/gallery/p2.jpg',
    alt: 'Laboratorio de prácticas',
    title: 'Aprendizaje Práctico',
    description: 'Instalaciones modernas equipadas con la última tecnología para formación práctica.'
  },
  {
    id: '3',
    src: '/assets/gallery/p3.jpg',
    alt: 'Instructor enseñando',
    title: 'Docentes Expertos',
    description: 'Profesionales con amplia experiencia compartiendo conocimientos con nuestros estudiantes.'
  },
  {
    id: '4',
    src: '/assets/gallery/p4.jpg',
    alt: 'Equipos técnicos',
    title: 'Tecnología de Vanguardia',
    description: 'Acceso a equipos y herramientas de última generación para una formación de calidad.'
  },
  {
    id: '5',
    src: '/assets/gallery/p5.jpg',
    alt: 'Estudiante concentrado',
    title: 'Enfoque en la Excelencia',
    description: 'Cada estudiante recibe atención personalizada para maximizar su potencial.'
  },
  {
    id: '6',
    src: '/assets/gallery/p6.jpg',
    alt: 'Proyecto en desarrollo',
    title: 'Proyectos Reales',
    description: 'Desarrollo de proyectos reales que preparan para el mundo laboral.'
  },
  {
    id: '7',
    src: '/assets/gallery/p7.jpg',
    alt: 'Certificación',
    title: 'Certificación Profesional',
    description: 'Programas que culminan en certificaciones reconocidas por el sector.'
  },
  {
    id: '8',
    src: '/assets/gallery/p8.jpg',
    alt: 'Graduación',
    title: 'Éxito Profesional',
    description: 'Nuestros graduados alcanzan posiciones destacadas en sus campos.'
  },
  {
    id: '9',
    src: '/assets/gallery/p9.jpg',
    alt: 'Innovación tecnológica',
    title: 'Innovación Constante',
    description: 'Mantenemos nuestros programas actualizados con las últimas tendencias tecnológicas.'
  },
  {
    id: '10',
    src: '/assets/gallery/p10.jpg',
    alt: 'Comunidad estudiantil',
    title: 'Comunidad de Aprendizaje',
    description: 'Una comunidad diversa de estudiantes apasionados por la tecnología.'
  },
  {
    id: '11',
    src: '/assets/gallery/p11.jpg',
    alt: 'Desarrollo de habilidades',
    title: 'Desarrollo Integral',
    description: 'Formación que combina habilidades técnicas y competencias profesionales.'
  },
  {
    id: '12',
    src: '/assets/gallery/p12.jpg',
    alt: 'Futuro profesional',
    title: 'Construyendo Futuros',
    description: 'Preparamos a nuestros estudiantes para los desafíos del mañana.'
  }
];

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de imágenes
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(GALLERY_IMAGES[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? GALLERY_IMAGES.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(GALLERY_IMAGES[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Cargando galería...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Minimalista */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Galería Visual
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Un vistazo a nuestro entorno de aprendizaje, instalaciones y la pasión que ponemos en cada proyecto.
            </p>
          </div>
        </div>
      </section>

      {/* Galería Minimalista */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                    
                    {/* Overlay de información */}
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-white">
                        <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                        <p className="text-sm text-slate-200 leading-relaxed">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Mejorado */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Botón de cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute -top-16 right-0 text-white hover:text-blue-400 transition-colors duration-300 z-10"
              aria-label="Cerrar galería"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            {/* Botones de navegación */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 transition-colors duration-300 z-10 bg-black/30 hover:bg-black/50 rounded-full p-3 backdrop-blur-sm"
              aria-label="Imagen anterior"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 transition-colors duration-300 z-10 bg-black/30 hover:bg-black/50 rounded-full p-3 backdrop-blur-sm"
              aria-label="Imagen siguiente"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Imagen */}
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
              />

              {/* Información de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 rounded-b-lg">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-white text-2xl font-semibold mb-3">
                    {selectedImage.title}
                  </h3>
                  <p className="text-slate-200 text-lg leading-relaxed mb-4">
                    {selectedImage.description}
                  </p>
                  <p className="text-slate-300 text-sm">
                    {currentIndex + 1} de {GALLERY_IMAGES.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage; 