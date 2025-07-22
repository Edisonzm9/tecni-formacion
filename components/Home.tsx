import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, COURSES, GALLERY_IMAGES, COURSE_BACKGROUND_IMAGES } from '../constants';
import { BoltIcon, WrenchScrewdriverIcon, AcademicCapIcon, UsersIcon, PresentationChartLineIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, ArrowRightIcon, ClockIcon, HashtagIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon, MailIcon, PhoneIcon, HandshakeIcon, SparklesIcon, GlobeAltIcon, ScaleIcon, LightBulbIcon, ArrowTrendingUpIcon } from './Icons';

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
             <img src="https://images.unsplash.com/photo-1581092921462-4209197c8354?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" alt="Taller técnico de alta tecnología" className="w-full h-full object-cover opacity-20 ken-burns-effect" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>

        <div className="relative z-20 px-4">
             <div className="overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tighter animate-[fadeInUp_0.8s_ease-out_forwards]">
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
    <section id="cta" className="bg-blue-600 text-white bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="container mx-auto px-6 py-20 text-center">
             <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¿Listo para potenciar tu futuro profesional?</h2>
                <p className="max-w-2xl mx-auto text-blue-200 mb-8">No esperes más. El momento de invertir en tus habilidades es ahora. Contáctanos y da el primer paso.</p>
                                                <Link to="/#contact" className="btn-secondary">
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

                <div className="max-w-4xl mx-auto text-center mb-16">
                    <p className="text-lg text-slate-600 leading-relaxed">{COMPANY_INFO.about}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <AnimatedSection delay="100ms">
                        <div className="bg-slate-50 p-10 rounded-xl shadow-lg border-t-4 border-blue-500">
                            <h3 className="text-3xl font-bold text-slate-800 mb-4">Nuestra Misión</h3>
                            <p className="text-slate-600 leading-relaxed">{COMPANY_INFO.mission}</p>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay="200ms">
                        <div className="bg-slate-50 p-10 rounded-xl shadow-lg border-t-4 border-orange-500">
                            <h3 className="text-3xl font-bold text-slate-800 mb-4">Nuestra Visión</h3>
                            <p className="text-slate-600 leading-relaxed">{COMPANY_INFO.vision}</p>
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

    const getBackgroundImage = (courseArea: string) => {
        const images = COURSE_BACKGROUND_IMAGES[courseArea as keyof typeof COURSE_BACKGROUND_IMAGES];
        if (images && images.length > 0) {
            // Seleccionar una imagen aleatoria de la categoría
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        }
        return '/assets/gallery/p1.jpg'; // Imagen por defecto
    };

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

                {/* Grid de Cursos con Imagen en 1/3 Superior */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {filteredCourses.map((course, index) => (
                        <AnimatedSection key={course.id} delay={`${index * 100}ms`}>
                            <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-500 h-96">
                                {/* Imagen en 1/3 Superior */}
                                <div className="relative h-1/3 overflow-hidden">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${getBackgroundImage(course.area)})` }}
                                    />
                                    {/* Overlay muy opaco para difuminar */}
                                    <div className="absolute inset-0 bg-black/70" />
                                    
                                    {/* Título sobre la imagen */}
                                    <div className="relative z-10 h-full flex items-center justify-center p-4">
                                        <h3 className="text-lg font-bold text-white text-center leading-tight line-clamp-2">
                                            {course.commercialName}
                                        </h3>
                                    </div>
                                </div>
                                
                                {/* Contenido en 2/3 Inferior */}
                                <div className="p-6 flex flex-col h-2/3">
                                    {/* Badge de categoría */}
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4 w-fit">
                                        {course.area}
                                    </span>
                                    
                                    {/* Descripción */}
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
                                        {course.details.focus}
                                    </p>
                                    
                                    {/* Información del Curso */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <ClockIcon className="w-4 h-4 text-blue-500" />
                                            <span>{course.details.totalDuration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <HashtagIcon className="w-4 h-4 text-blue-500" />
                                            <span>Código: {course.code}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Botón */}
                                    <Link 
                                        to={`/course/${course.id}`} 
                                        className="group/btn flex items-center justify-center w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                                    >
                                        Ver Malla Curricular 
                                        <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
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
                                    <Link to="/gallery" className="btn-secondary">
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

// Sección de Contacto
const ContactSection = () => {
    const { contact } = COMPANY_INFO;
    
    const contactInfo = [
        { icon: <ClockIcon className="w-6 h-6 text-blue-500" />, title: "Horarios", value: "Lunes a Viernes: 8:00 AM - 6:00 PM" },
        { icon: <HashtagIcon className="w-6 h-6 text-blue-500" />, title: "Ubicación", value: contact.address },
        { icon: <MailIcon className="w-6 h-6 text-blue-500" />, title: "Email", value: contact.email, href: `mailto:${contact.email}` },
        { icon: <PhoneIcon className="w-6 h-6 text-blue-500" />, title: "Teléfono", value: contact.phone, href: `tel:${contact.whatsapp}` },
    ];

    return (
        <section id="contact" className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h2 className="section-title text-white">Contáctanos</h2>
                    <p className="section-subtitle text-slate-300">Estamos aquí para responder tus preguntas y ayudarte a comenzar tu formación profesional.</p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-2 gap-12 mt-12">
                    {/* Información de Contacto */}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {contactInfo.map((item, index) => (
                                <AnimatedSection key={item.title} delay={`${index * 100}ms`}>
                                    <div className="bg-slate-700 p-6 rounded-xl hover:bg-slate-600 transition-colors duration-300">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 bg-blue-500/20 rounded-full p-3">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                                {item.href ? (
                                                    <a href={item.href} className="text-slate-300 hover:text-blue-400 transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-slate-300">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    {/* Formulario de Contacto */}
                    <AnimatedSection delay="200ms">
                        <div className="bg-slate-700 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <input 
                                        type="text" 
                                        placeholder="Tu nombre" 
                                        className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-slate-400" 
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Tu email" 
                                        className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-slate-400" 
                                    />
                                </div>
                                <textarea 
                                    rows={4} 
                                    placeholder="Tu mensaje" 
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-slate-400 resize-none" 
                                ></textarea>
                                <Link to="/contact" className="btn-primary w-full text-center">
                                    Enviar Mensaje
                                </Link>
                            </form>
                        </div>
                    </AnimatedSection>
                </div>
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
            <ContactSection />
        </div>
    );
};

export default Home;