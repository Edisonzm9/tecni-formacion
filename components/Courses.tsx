import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COURSES } from '../constants';
import CourseCard from './CourseCard';

const PageHeader = ({ title, subtitle }: { title: string, subtitle:string }) => (
    <div className="bg-slate-800 py-24 text-center text-white bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black">{title}</h1>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);



const CoursesPage: React.FC = () => {
    const location = useLocation();
    const initialFilter = location.state?.filter || 'Todos';
    const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
    
    const courseAreas = ['Todos', 'Eléctrica', 'Mecánica', 'Formación', 'Automatización'];

    useEffect(() => {
        if(location.state?.filter) {
            setActiveFilter(location.state.filter);
        }
    }, [location.state]);

    const filteredCourses = useMemo(() => {
        if (activeFilter === 'Todos') {
            return COURSES;
        }
        return COURSES.filter(course => course.area === activeFilter);
    }, [activeFilter]);

    return (
        <div id="courses">
            <PageHeader title="Todos Nuestros Cursos" subtitle="Encuentra la formación técnica ideal para ti y da el siguiente paso en tu carrera profesional." />
            
            <div className="container mx-auto px-6 py-20">
                <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {courseAreas.map(area => (
                        <button
                            key={area}
                            onClick={() => setActiveFilter(area)}
                            className={`px-6 py-2 font-semibold rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
                                activeFilter === area 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-white text-slate-700 hover:bg-slate-200 shadow-sm'
                            }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} variant="compact" showImage={false} />
                    ))}
                </div>

                 {filteredCourses.length === 0 && (
                    <div className="text-center py-16 col-span-full">
                        <p className="text-2xl text-slate-500 font-semibold">Próximamente</p>
                        <p className="text-slate-400 mt-2">No hay cursos disponibles en esta categoría en este momento.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default CoursesPage;