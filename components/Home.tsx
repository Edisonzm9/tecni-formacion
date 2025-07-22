import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { BoltIcon, WrenchScrewdriverIcon, AcademicCapIcon, UsersIcon, PresentationChartLineIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, ArrowRightIcon } from './Icons';

// Hook for scroll animations
const useOnScreen = <T extends Element,>(options: IntersectionObserverInit): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
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
                <Link to="/contact" className="cta-button-secondary">
                    Contáctanos Ahora
                </Link>
             </AnimatedSection>
        </div>
    </section>
);

const Home: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <AreasSection />
            <WhyUsSection />
            <CtaSection />
        </div>
    );
};

export default Home;