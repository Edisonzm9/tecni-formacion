import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TecniFormacionLogo, MenuIcon, CloseIcon } from './Icons';

const NavLinks = ({ isMobile, closeMenu }: { isMobile?: boolean, closeMenu?: () => void }) => {
    const links = [
        { name: 'Inicio', path: '/' },
        { name: 'Sobre Nosotros', path: '/about' },
        { name: 'Cursos', path: '/courses' },
        { name: 'Contacto', path: '/contact' },
    ];

    const baseClasses = 'uppercase font-semibold tracking-wider transition-colors duration-300 relative group';
    const mobileClasses = `block py-4 text-center text-2xl ${baseClasses}`;
    const desktopClasses = `text-sm ${baseClasses}`;

    return (
        <>
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    end // Use 'end' for the home link to prevent it from being active on other routes
                    className={({ isActive }) => 
                        `${isMobile ? mobileClasses : desktopClasses} ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {link.name}
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </>
                    )}
                </NavLink>
            ))}
        </>
    );
};


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
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
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <NavLink to="/" onClick={closeMenu}>
                       <TecniFormacionLogo />
                    </NavLink>
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLinks isMobile={false} closeMenu={closeMenu} />
                        <a href="#aula-virtual" className="text-sm font-semibold border-2 border-orange-500 text-orange-500 rounded-full py-2 px-6 hover:bg-orange-500 hover:text-white transition-all duration-300">Aula Virtual</a>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 hover:text-blue-600 z-50 relative">
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
                    <NavLinks isMobile closeMenu={closeMenu} />
                    <a href="#aula-virtual" onClick={closeMenu} className="cta-button mt-6">Aula Virtual</a>
                </div>
            </div>
        </header>
    );
};

export default Header;