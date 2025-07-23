import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { TecniFormacionLogo, MenuIcon, CloseIcon } from './Icons';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavItem {
    name: string;
    path: string;
    sectionId: string;
}

const NavLinks = ({ isMobile, closeMenu, activeSection, scrollToSection }: { 
    isMobile?: boolean, 
    closeMenu?: () => void,
    activeSection: string,
    scrollToSection: (sectionId: string) => void
}) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    const links: NavItem[] = [
        { name: 'Inicio', path: '/', sectionId: 'home' },
        { name: 'Sobre Nosotros', path: '/#about', sectionId: 'about' },
        { name: 'Cursos', path: '/#courses', sectionId: 'courses' },
        { name: 'Galería', path: '/#gallery', sectionId: 'gallery' },
    ];

    const baseClasses = 'uppercase font-semibold tracking-wider transition-all duration-300 relative group cursor-pointer';
    const mobileClasses = `block py-4 text-center text-2xl ${baseClasses}`;
    const desktopClasses = `text-sm ${baseClasses}`;

    const handleNavClick = (e: React.MouseEvent, link: NavItem) => {
        e.preventDefault();
        
        if (isHomePage) {
            // Si estamos en la página de inicio, hacer scroll suave a la sección
            scrollToSection(link.sectionId);
        } else {
            // Si no estamos en la página de inicio, navegar a la página y luego a la sección
            window.location.href = link.path;
        }
        
        if (closeMenu) closeMenu();
    };

    const isActive = (link: NavItem) => {
        if (!isHomePage) return false;
        return activeSection === link.sectionId;
    };

    return (
        <>
            {links.map((link) => (
                <div
                    key={link.name}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`${isMobile ? mobileClasses : desktopClasses} ${
                        isActive(link) 
                            ? 'text-blue-600' 
                            : 'text-slate-600 hover:text-blue-600'
                    }`}
                >
                    {link.name}
                    <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ease-out ${
                            isActive(link) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} 
                    />
                </div>
            ))}
        </>
    );
};

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { activeSection, scrollToSection } = useActiveSection();

    useEffect(() => {
        const handleScroll = () => {
            // Detectar scroll para cambiar el fondo del header
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <header id="header" className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <NavLink to="/" onClick={closeMenu}>
                       <TecniFormacionLogo />
                    </NavLink>
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLinks 
                            isMobile={false} 
                            closeMenu={closeMenu} 
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                        />
                        <a 
                            href="https://aula.tecniformacion.es" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold border-2 border-orange-500 text-orange-500 rounded-full py-2 px-6 hover:bg-orange-500 hover:text-white transition-all duration-300"
                        >
                            Aula Virtual
                        </a>
                    </div>
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-slate-800 hover:text-blue-600 z-50 relative"
                        >
                            {isOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </nav>
            
            {/* Mobile Menu Overlay */}
            <div 
                className={`lg:hidden fixed inset-0 bg-white z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={closeMenu}
            >
                <div 
                    className="flex flex-col items-center justify-center h-full space-y-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    <NavLinks 
                        isMobile 
                        closeMenu={closeMenu} 
                        activeSection={activeSection}
                        scrollToSection={scrollToSection}
                    />
                    <a 
                        href="https://aula.tecniformacion.es" 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu} 
                        className="cta-button mt-6"
                    >
                        Aula Virtual
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;