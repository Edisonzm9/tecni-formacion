import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES, COURSE_BACKGROUND_IMAGES } from '../constants';
import { Course, Module } from '../types';
import { ChevronDownIcon, ClockIcon, HashtagIcon, UserCircleIcon, CalendarDaysIcon, PresentationChartLineIcon } from './Icons';

const AccordionItem: React.FC<{ module: Module, isOpen: boolean, onClick: () => void }> = ({ module, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none bg-white hover:bg-slate-50 transition-colors"
            >
                <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-slate-800">{module.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">Duración: {module.duration}</p>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-slate-500 transition-transform duration-300 transform-gpu ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="p-6 bg-slate-50 border-t border-slate-200">
                    <ul className="list-disc list-inside space-y-2 text-slate-600 marker:text-blue-500">
                        {module.topics.map((topic, index) => (
                            <li key={index} className="pl-2">{topic}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const course = COURSES.find(c => c.id === courseId);
    const [openAccordion, setOpenAccordion] = useState<string | null>(course?.curriculum[0]?.title ?? null);
    const navigate = useNavigate();

    const getBackgroundImage = (courseArea: string) => {
        const images = COURSE_BACKGROUND_IMAGES[courseArea as keyof typeof COURSE_BACKGROUND_IMAGES];
        if (images && images.length > 0) {
            // Seleccionar una imagen aleatoria de la categoría
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        }
        return '/assets/gallery/p1.jpg'; // Imagen por defecto
    };

    const handleAccordionClick = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    const handleInscription = () => {
        if (course) {
            // Crear parámetros de URL con la información del curso
            const params = new URLSearchParams({
                course: course.commercialName,
                courseId: course.id,
                instructor: course.instructor,
                duration: course.details.totalDuration,
                hours: course.details.totalHours,
                area: course.area,
                focus: course.details.focus
            });
            
            // Redirigir a la página de contacto con los datos pre-llenados
            navigate(`/contact?${params.toString()}`);
        }
    };

    if (!course) {
        return (
            <div className="h-screen flex items-center justify-center text-center px-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-700">Curso no encontrado</h1>
                    <p className="text-slate-500 mt-4">El curso que buscas no existe o ha sido movido.</p>
                    <Link to="/courses" className="cta-button mt-8">Ver todos los cursos</Link>
                </div>
            </div>
        );
    }
    
    const detailItems = [
        { icon: <ClockIcon className="w-5 h-5 text-blue-500" />, label: "Duración", value: course.details.totalDuration },
        { icon: <PresentationChartLineIcon className="w-5 h-5 text-blue-500" />, label: "Total Horas", value: course.details.totalHours },
        ...(course.details.frequency ? [{ icon: <CalendarDaysIcon className="w-5 h-5 text-blue-500" />, label: "Frecuencia", value: course.details.frequency }] : []),
        ...(course.details.sessionDuration ? [{ icon: <ClockIcon className="w-5 h-5 text-blue-500" />, label: "Sesión", value: course.details.sessionDuration }] : []),
        { icon: <UserCircleIcon className="w-5 h-5 text-blue-500" />, label: "Instructor", value: course.instructor },
    ];

    return (
        <div>
            <div className="relative text-white pt-32 pb-20 overflow-hidden">
                {/* Imagen de Fondo */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getBackgroundImage(course.area)})` }}
                />
                
                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90" />
                
                {/* Contenido */}
                <div className="relative z-10 container mx-auto px-6">
                    <p className="font-semibold text-blue-400 mb-2 tracking-widest uppercase">{course.area}</p>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">{course.commercialName}</h1>
                    <p className="text-lg text-slate-200 max-w-3xl">{course.details.focus}</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Curriculum */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Contenido del Curso (Malla Curricular)</h2>
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200/80">
                            {course.curriculum.map((module) => (
                                <AccordionItem 
                                    key={module.title} 
                                    module={module}
                                    isOpen={openAccordion === module.title}
                                    onClick={() => handleAccordionClick(module.title)}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Right Column: Details & CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200/80">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Detalles Clave</h3>
                                <ul className="space-y-4 text-slate-600">
                                    {detailItems.map(item => (
                                        <li key={item.label} className="flex items-start gap-3">
                                            <span className="flex-shrink-0 mt-1">{item.icon}</span>
                                            <div>
                                                <strong className="block text-sm text-slate-500">{item.label}</strong>
                                                <span className="text-slate-800 font-semibold">{item.value}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <button 
                                        onClick={handleInscription}
                                        className="w-full cta-button text-center"
                                    >
                                        Inscríbete en este Curso
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;