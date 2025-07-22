import React from 'react';
import { WhatsAppIcon } from './Icons';
import { COMPANY_INFO } from '../constants';

const FloatingWhatsApp: React.FC = () => {
    return (
        <a
            href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl z-40 transform hover:scale-110 transition-transform duration-300 pulse-animation"
            aria-label="Contactar por WhatsApp"
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
};

export default FloatingWhatsApp;