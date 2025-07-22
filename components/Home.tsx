import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, COURSES, GALLERY_IMAGES } from '../constants';
import { BoltIcon, WrenchScrewdriverIcon, AcademicCapIcon, UsersIcon, PresentationChartLineIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HandshakeIcon, SparklesIcon, GlobeAltIcon, ScaleIcon, LightBulbIcon, ArrowTrendingUpIcon } from './Icons';
import CourseCard from './CourseCard';

// Hook for scroll animations
const useOnScreen = <T extends Element,>(options: IntersectionObserverInit): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) {
            observer.unobserve(ref.current);
        }
      }
    }, options);
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if(currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Hook para scroll suave a secciones
const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.pathname === '/') {
        e.preventDefault();
        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};


const AnimatedSection: React.FC<{children: React.ReactNode; className?: string, delay?: string}> = ({ children, className, delay = '0ms' }) => {
    const options = useMemo(() => ({ threshold: 0.1 }), []);
    const [ref, isVisible] = useOnScreen<HTMLDivElement>(options);
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
};

const HeroSection = () => (
    <section id="hero" className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-white text-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img src="/assets/gallery/p16.jpg" alt="Taller técnico de alta tecnología" className="w-full h-full object-cover opacity-30 blur-sm ken-burns-effect" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent z-10"></div>

        <div className="relative z-20 px-4">
             <div className="overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tighter text-white animate-[fadeInUp_0.8s_ease-out_forwards]">
                    {COMPANY_INFO.slogan.split(',')[0]},
                </h1>
             </div>
             <div className="overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tighter text-blue-400 animate-[fadeInUp_0.8s_0.2s_ease-out_forwards] opacity-0">
                    {COMPANY_INFO.slogan.split(',')[1]}
                </h1>
             </div>
             <div className="overflow-hidden">
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8 animate-[fadeInUp_0.8s_0.4s_ease-out_forwards] opacity-0">
                    Conviértete en un profesional técnico certificado y de alta demanda.
                </p>
            </div>
            <div className="animate-[fadeInUp_0.8s_0.6s_ease-out_forwards] opacity-0">
                <Link to="/courses" className="cta-button">
                    Explora Nuestros Cursos
                </Link>
            </div>
        </div>
    </section>
);

const areas = [
    { name: "Área Eléctrica", description: "Domina desde instalaciones residenciales hasta redes de alta tensión.", icon: <BoltIcon className="w-8 h-8 text-blue-500" />, color: "blue" },
    { name: "Área Mecánica", description: "Especialízate en soldadura, diagnóstico y reparación automotriz.", icon: <WrenchScrewdriverIcon className="w-8 h-8 text-orange-500" />, color: "orange" },
    { name: "Formación Transversal", description: "Desarrolla habilidades de instructor y liderazgo en el aprendizaje.", icon: <AcademicCapIcon className="w-8 h-8 text-emerald-500" />, color: "emerald" },
];

const AreasSection = () => {
    const areaColorMap = {
        blue: 'bg-blue-100',
        orange: 'bg-orange-100',
        emerald: 'bg-emerald-100',
    };

    return (
        <section id="areas" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h2 className="section-title">Nuestras Áreas de Formación</h2>
                    <p className="section-subtitle">Ofrecemos capacitación de vanguardia en los sectores técnicos más importantes, con un enfoque práctico y orientado al mercado laboral.</p>
                </AnimatedSection>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {areas.map((area, index) => (
                        <AnimatedSection key={area.name} delay={`${index * 150}ms`}>
                            <div className="group bg-slate-50 border border-slate-200/80 rounded-xl p-8 text-center h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-100">
                                <div className={`w-20 h-20 rounded-full ${areaColorMap[area.color as keyof typeof areaColorMap]} flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                    {area.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{area.name}</h3>
                                <p className="text-slate-600 mb-6">{area.description}</p>
                                <Link to="/courses" state={{ filter: area.name.split(' ')[1] }} className="font-bold text-blue-600 hover:text-orange-500 transition-colors group-hover:text-orange-500 flex items-center justify-center gap-2">
                                    Ver cursos <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

const whyUsItems = [
    { ...COMPANY_INFO.whyUs[0], icon: <UsersIcon className="w-7 h-7" /> },
    { ...COMPANY_INFO.whyUs[1], icon: <PresentationChartLineIcon className="w-7 h-7" /> },
    { ...COMPANY_INFO.whyUs[2], icon: <ClipboardDocumentCheckIcon className="w-7 h-7" /> },
    { ...COMPANY_INFO.whyUs[3], icon: <CalendarDaysIcon className="w-7 h-7" /> },
]

const WhyUsSection = () => (
    <section id="why-us" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="section-title">¿Por qué Confiar en Nosotros?</h2>
                <p className="section-subtitle">Nuestro compromiso es tu éxito profesional. Te ofrecemos una formación de calidad superior, pensada para el mundo real.</p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyUsItems.map((item, index) => (
                    <AnimatedSection key={item.title} delay={`${index * 150}ms`}>
                        <div className="bg-white rounded-xl p-6 shadow-sm h-full border border-transparent hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                           <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                           </div>
                            <p className="text-sm text-slate-600 mt-4">{item.description}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
);

const CtaSection = () => (
    <section id="cta" className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src="/assets/gallery/p12.jpg" alt="Fondo técnico" className="w-full h-full object-cover opacity-40 blur-sm" />
        </div>
        <div className="absolute inset-0 bg-blue-600/30 z-10"></div>
        <div className="container mx-auto px-6 py-20 text-center relative z-20">
             <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¿Listo para potenciar tu futuro profesional?</h2>
                <p className="max-w-2xl mx-auto text-white mb-8">No esperes más. El momento de invertir en tus habilidades es ahora. Contáctanos y da el primer paso.</p>
                                                <Link to="/contact" className="btn-secondary">
                                    Contáctanos Ahora
                                </Link>
             </AnimatedSection>
        </div>
    </section>
);

// Sección Sobre Nosotros
const AboutSection = () => {
    const valueIcons = [
        <HandshakeIcon className="w-7 h-7" />,
        <SparklesIcon className="w-7 h-7" />,
        <GlobeAltIcon className="w-7 h-7" />,
        <ScaleIcon className="w-7 h-7" />,
        <LightBulbIcon className="w-7 h-7" />,
        <ArrowTrendingUpIcon className="w-7 h-7" />
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h2 className="section-title">Sobre TECNIFORMACIÓN S.A.S</h2>
                    <p className="section-subtitle">Conoce nuestra historia, misión y los valores que nos guían hacia la excelencia en formación técnica.</p>
                </AnimatedSection>

                {/* Card Principal con Imagen y Texto */}
                <AnimatedSection delay="100ms">
                    <div className="max-w-6xl mx-auto mb-16">
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80">
                            <div className="grid lg:grid-cols-2 gap-0">
                                {/* Lado Izquierdo - Imagen */}
                                <div className="relative h-80 lg:h-full min-h-[400px]">
                                    <img 
                                        src="/assets/gallery/p8.jpg" 
                                        alt="TECNIFORMACIÓN - Formación Técnica" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">TECNIFORMACIÓN S.A.S</h3>
                                        <p className="text-blue-200 text-sm">Formación técnica de excelencia</p>
                                    </div>
                                </div>
                                
                                {/* Lado Derecho - Texto con Comillas */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="relative">
                                        {/* Comilla de apertura */}
                                        <div className="absolute -top-4 -left-2 text-6xl text-blue-500/30 font-serif">"</div>
                                        
                                        <p className="text-lg text-slate-700 leading-relaxed relative z-10 pl-8">
                                            {COMPANY_INFO.about}
                                        </p>
                                        
                                        {/* Comilla de cierre */}
                                        <div className="text-6xl text-blue-500/30 font-serif text-right mt-4">"</div>
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">Empresa Ecuatoriana</p>
                                                <p className="text-sm text-slate-600">Cuenca, Ecuador</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Misión y Visión Mejoradas */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <AnimatedSection delay="200ms">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl border-l-4 border-blue-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Nuestra Misión</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed">{COMPANY_INFO.mission}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                    
                    <AnimatedSection delay="300ms">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-xl border-l-4 border-orange-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Nuestra Visión</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed">{COMPANY_INFO.vision}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                <AnimatedSection delay="300ms">
                    <h3 className="text-3xl font-bold text-slate-800 text-center mb-8">Nuestros Valores</h3>
                    <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">Estos son los principios que definen nuestra forma de trabajar y enseñar, garantizando una experiencia de calidad para todos.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {COMPANY_INFO.values.map((value, index) => (
                            <div key={value.name} className="bg-slate-50 p-6 rounded-lg border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="text-blue-500">{valueIcons[index]}</div>
                                    <h4 className="text-xl font-bold text-slate-800">{value.name}</h4>
                                </div>
                                <p className="text-slate-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

// Sección de Cursos
const CoursesSection = () => {
    const [activeFilter, setActiveFilter] = useState<string>('Todos');
    const courseAreas = ['Todos', 'Eléctrica', 'Mecánica', 'Formación', 'Automatización'];

    const filteredCourses = useMemo(() => {
        if (activeFilter === 'Todos') {
            return COURSES.slice(0, 8); // Mostrar solo 8 cursos en el landing
        }
        return COURSES.filter(course => course.area === activeFilter).slice(0, 8);
    }, [activeFilter]);



    return (
        <section id="courses" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h2 className="section-title">Nuestros Cursos Destacados</h2>
                    <p className="section-subtitle">Descubre nuestra amplia gama de programas de formación técnica diseñados para impulsar tu carrera profesional.</p>
                </AnimatedSection>

                {/* Filtros */}
                <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {courseAreas.map(area => (
                        <button
                            key={area}
                            onClick={() => setActiveFilter(area)}
                            className={`px-6 py-2 font-semibold rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
                                activeFilter === area 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                            }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>

                {/* Grid de Cursos */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {filteredCourses.map((course, index) => (
                        <AnimatedSection key={course.id} delay={`${index * 100}ms`}>
                            <CourseCard course={course} variant="full" showImage={true} />
                        </AnimatedSection>
                    ))}
                </div>

                {/* Botón Ver Todos */}
                <div className="text-center">
                                    <Link to="/courses" className="btn-secondary">
                    Ver Todos los Cursos
                </Link>
                </div>
            </div>
        </section>
    );
};

// Sección de Galería
const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

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
        if (selectedImage) {
            const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
            setCurrentIndex(nextIndex);
            setSelectedImage(GALLERY_IMAGES[nextIndex]);
        }
    };

    const prevImage = () => {
        if (selectedImage) {
            const prevIndex = currentIndex === 0 ? GALLERY_IMAGES.length - 1 : currentIndex - 1;
            setCurrentIndex(prevIndex);
            setSelectedImage(GALLERY_IMAGES[prevIndex]);
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

    return (
        <section id="gallery" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h2 className="section-title">Galería de Nuestros Cursos</h2>
                    <p className="section-subtitle">Explora visualmente nuestros programas de formación técnica y certificación profesional.</p>
                </AnimatedSection>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {GALLERY_IMAGES.slice(0, 8).map((image, index) => (
                        <AnimatedSection key={image.id} delay={`${index * 100}ms`}>
                            <div
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
                        </AnimatedSection>
                    ))}
                </div>

                {/* Botón Ver Galería Completa */}
                <div className="text-center">
                    <Link 
                        to="/gallery" 
                        className="inline-flex items-center justify-center px-8 py-4 text-slate-700 font-medium rounded-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 transform hover:scale-105"
                    >
                        Ver Galería Completa
                    </Link>
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
                                />

                                {/* Image Info */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                    <h3 className="text-white text-xl font-semibold mb-2">
                                        {selectedImage.title || selectedImage.alt}
                                    </h3>
                                    {selectedImage.description && (
                                        <p className="text-slate-200">{selectedImage.description}</p>
                                    )}
                                    <p className="text-slate-300 text-sm mt-2">
                                        {currentIndex + 1} de {GALLERY_IMAGES.length}
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



const Home: React.FC = () => {
    useSmoothScroll();
    
    return (
        <div id="home">
            <HeroSection />
            <AreasSection />
            <WhyUsSection />
            <CtaSection />
            <AboutSection />
            <CoursesSection />
            <GallerySection />
        </div>
    );
};

export default Home;