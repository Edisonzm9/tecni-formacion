import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from './Icons';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title = "Galería", subtitle = "Explora nuestros proyectos y actividades" }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage) {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedImage(images[prevIndex]);
    }
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

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-heading">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-square bg-slate-200 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1">{image.title || image.alt}</h3>
                  {image.description && (
                    <p className="text-sm text-slate-200">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors duration-300 z-10"
                aria-label="Cerrar galería"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
                aria-label="Imagen anterior"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
                aria-label="Imagen siguiente"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                
                {/* Loading Spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
                  </div>
                )}

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {selectedImage.title || selectedImage.alt}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-slate-200">{selectedImage.description}</p>
                  )}
                  <p className="text-slate-300 text-sm mt-2">
                    {currentIndex + 1} de {images.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery; 