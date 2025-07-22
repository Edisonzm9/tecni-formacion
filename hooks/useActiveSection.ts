import { useState, useEffect } from 'react';

interface Section {
    id: string;
    element: HTMLElement | null;
}

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections: Section[] = [
            { id: 'home', element: document.getElementById('home') },
            { id: 'about', element: document.getElementById('about') },
            { id: 'courses', element: document.getElementById('courses') },
            { id: 'gallery', element: document.getElementById('gallery') },
            { id: 'contact', element: document.getElementById('contact') },
        ];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            let currentSection = 'home';
            
            sections.forEach(({ id, element }) => {
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;
                    
                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        currentSection = id;
                    }
                }
            });
            
            setActiveSection(currentSection);
        };

        // Ejecutar una vez al montar para establecer la sección inicial
        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80; // Altura del header
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    return { activeSection, scrollToSection };
}; 