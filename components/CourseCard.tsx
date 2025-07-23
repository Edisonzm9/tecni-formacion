import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { ClockIcon, HashtagIcon, ArrowRightIcon } from './Icons';

interface CourseCardProps {
    course: Course;
    variant?: 'compact' | 'full';
    showImage?: boolean;
}

const areaColorMap: { [key: string]: string } = {
    'Eléctrica': 'border-blue-500',
    'Mecánica': 'border-orange-500',
    'Formación Transversal': 'border-emerald-500',
    'Industrial': 'border-purple-500',

};

// Mapeo específico de imágenes para cada curso
const getCourseImage = (courseId: string): string => {
    const courseImageMap: { [key: string]: string } = {
        // Cursos Eléctricos
        'electricidad-residencial': '/assets/gallery/p9.jpg', // Trabajo con cables eléctricos y multímetro
        'luminotecnia-variables-electricas': '/assets/gallery/p18.jpg', // Cables de colores para iluminación
        'redes-electricas-liniero': '/assets/gallery/t1.jpg', // Trabajo en postes eléctricos
        'diagnostico-sistemas-electricos-vehiculo': '/assets/gallery/p2.jpg', // Trabajo en motor de vehículo
        
        // Cursos de Automatización
        'sistemas-automatizados': '/assets/gallery/p4.jpg', // Trabajo industrial/automatización
        
        // Cursos de Formación
        'arquitectura-aprendizaje': '/assets/gallery/p11.jpg', // Presentación/enseñanza
        'evaluacion-competencias': '/assets/gallery/p15.jpg', // Evaluación/blueprint industrial
        'formacion-instructores': '/assets/gallery/p12.jpg', // Grupo de estudiantes con instructor
        
        // Cursos Mecánicos
        'diagnostico-sistemas-automotrices': '/assets/gallery/p5.jpg', // Trabajo en motor con guantes naranjas
        'tecnico-soldadura-electrica': '/assets/gallery/p7.jpg', // Soldadura con herramientas
    };
    
    const imagePath = courseImageMap[courseId] || '/assets/gallery/p1.jpg';
    console.log(`Course: ${courseId} -> Image: ${imagePath}`); // Debug
    return imagePath;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, variant = 'full', showImage = true }) => {
    if (variant === 'compact') {
        return (
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 border-t-4 ${areaColorMap[course.area] || 'border-slate-500'}`}>
                <div className="p-6 flex-grow flex flex-col">
                    <p className="text-sm font-bold text-blue-600 mb-2">{course.area}</p>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 flex-grow">{course.commercialName}</h3>
                    <div className="text-sm text-slate-500 mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            <span><strong>Duración:</strong> {course.details.totalDuration} ({course.details.totalHours})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HashtagIcon className="w-4 h-4" />
                            <span><strong>Código:</strong> {course.code}</span>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50">
                    <Link to={`/course/${course.id}`} className="group flex items-center justify-center w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        Ver Malla Curricular <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-500 h-96">
            {showImage && (
                <div className="relative h-1/3 overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ 
                            backgroundImage: `url(${getCourseImage(course.id)})`,
                            backgroundColor: '#f3f4f6' // Fallback color
                        }}
                        onError={(e) => {
                            // Si la imagen falla, usar una imagen por defecto
                            e.currentTarget.style.backgroundImage = 'url(/assets/gallery/p1.jpg)';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/70" />
                    
                    <div className="relative z-10 h-full flex items-center justify-center p-4">
                        <h3 className="text-lg font-bold text-white text-center leading-tight line-clamp-2">
                            {course.commercialName}
                        </h3>
                    </div>
                </div>
            )}
            
            <div className="p-6 flex flex-col h-2/3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4 w-fit">
                    {course.area}
                </span>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
                    {course.details.focus}
                </p>
                
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
                
                <Link 
                    to={`/course/${course.id}`} 
                    className="group/btn flex items-center justify-center w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                    Ver Malla Curricular 
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default CourseCard; 