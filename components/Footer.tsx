import React from 'react';
import { Link } from 'react-router-dom';
import { TecniFormacionLogo, FacebookIcon, InstagramIcon, TikTokIcon, MailIcon, PhoneIcon, MapPinIcon } from './Icons';
import { COMPANY_INFO } from '../constants';

const Footer: React.FC = () => {
    const { contact, name, slogan } = COMPANY_INFO;

    const quickLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Sobre Nosotros', path: '/about' },
        { name: 'Cursos', path: '/courses' },
        { name: 'Galería', path: '/gallery' },
        { name: 'Contacto', path: '/contact' },
    ];
    
    const socialLinks = [
        { name: 'Facebook', href: contact.social.facebook, icon: <FacebookIcon className="w-6 h-6" /> },
        { name: 'Instagram', href: contact.social.instagram, icon: <InstagramIcon className="w-6 h-6" /> },
        // TikTok oculto visualmente pero código preservado para uso futuro
        // { name: 'TikTok', href: contact.social.tiktok, icon: <TikTokIcon className="w-6 h-6" /> },
    ];

    return (
        <footer id="footer" className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1: Brand */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <TecniFormacionLogo />
                        </Link>
                        <p className="text-slate-400 text-sm mt-4">{slogan}</p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transform transition-all duration-300">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-heading text-lg font-bold text-white mb-4">Navegación</h4>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Column 3: Courses Areas */}
                     <div>
                        <h4 className="font-heading text-lg font-bold text-white mb-4">Áreas de Formación</h4>
                        <ul className="space-y-3">
                            <li><Link to="/courses" state={{ filter: 'Eléctrica' }} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">Área Eléctrica</Link></li>
                            <li><Link to="/courses" state={{ filter: 'Mecánica' }} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">Área Mecánica</Link></li>
                            <li><Link to="/courses" state={{ filter: 'Formación' }} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">Área de Formación</Link></li>
                             <li><Link to="/courses" state={{ filter: 'Automatización' }} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">Automatización</Link></li>
                        </ul>
                    </div>


                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-heading text-lg font-bold text-white mb-4">Contáctanos</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start">
                                <MapPinIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-slate-500" />
                                <span className="text-slate-400">{contact.address}</span>
                            </li>
                            <li className="flex items-center">
                                <MailIcon className="w-5 h-5 mr-3 flex-shrink-0 text-slate-500" />
                                <a href={`mailto:${contact.email}`} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">{contact.email}</a>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon className="w-5 h-5 mr-3 flex-shrink-0 text-slate-500" />
                                <a href={`tel:${contact.whatsapp}`} className="hover:text-orange-400 transition-colors duration-300 text-slate-400">{contact.phone}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {name}. Todos los derechos reservados. Sitio diseñado con Tessa Studio❤️.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;