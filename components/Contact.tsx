import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, InstagramIcon, TikTokIcon } from './Icons';

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-slate-800 py-24 text-center text-white">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black">{title}</h1>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const Contact: React.FC = () => {
    const { contact } = COMPANY_INFO;
    const [searchParams] = useSearchParams();
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // Estado para mostrar información del curso
    const [courseInfo, setCourseInfo] = useState<{
        course?: string;
        courseId?: string;
        instructor?: string;
        duration?: string;
        hours?: string;
        area?: string;
        focus?: string;
    } | null>(null);

    // Efecto para cargar datos de la URL y pre-llenar el formulario
    useEffect(() => {
        const course = searchParams.get('course');
        const courseId = searchParams.get('courseId');
        const instructor = searchParams.get('instructor');
        const duration = searchParams.get('duration');
        const hours = searchParams.get('hours');
        const area = searchParams.get('area');
        const focus = searchParams.get('focus');

        if (course) {
            setCourseInfo({
                course: course || undefined,
                courseId: courseId || undefined,
                instructor: instructor || undefined,
                duration: duration || undefined,
                hours: hours || undefined,
                area: area || undefined,
                focus: focus || undefined
            });

            // Pre-llenar el mensaje con información del curso
            const defaultMessage = `Hola, estoy interesado en inscribirme en el curso: ${course}

Información del curso:
• Área: ${area}
• Instructor: ${instructor}
• Duración: ${duration}
• Horas: ${hours}
• Enfoque: ${focus}

Por favor, me gustaría recibir más información sobre horarios, costos y proceso de inscripción.`;

            setFormData(prev => ({
                ...prev,
                message: defaultMessage
            }));
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateWhatsAppMessage = () => {
        return `Hola, soy ${formData.name} y estoy interesado en inscribirme en el curso: ${courseInfo?.course || 'Formación Técnica'}

Mis datos de contacto:
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

${courseInfo ? `
Información del curso:
• Área: ${courseInfo.area}
• Instructor: ${courseInfo.instructor}
• Duración: ${courseInfo.duration}
• Horas: ${courseInfo.hours}
• Enfoque: ${courseInfo.focus}
` : ''}

Mensaje adicional: ${formData.message}

Por favor, me gustaría recibir más información sobre horarios, costos y proceso de inscripción.`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Crear mensaje personalizado para WhatsApp
        const whatsappMessage = generateWhatsAppMessage();

        // Codificar el mensaje para WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodedMessage}`;
        
        // Abrir WhatsApp en una nueva ventana
        window.open(whatsappUrl, '_blank');
    };

    const contactInfo = [
        { icon: <MapPinIcon className="w-6 h-6 text-blue-500" />, title: "Dirección", value: contact.address },
        { icon: <MailIcon className="w-6 h-6 text-blue-500" />, title: "Correo Electrónico", value: contact.email, href: `mailto:${contact.email}` },
        { icon: <PhoneIcon className="w-6 h-6 text-blue-500" />, title: "Celular", value: contact.phone, href: `tel:${contact.whatsapp}` },
    ];

    const socialLinks = [
        { name: 'Facebook', href: contact.social.facebook, icon: <FacebookIcon className="w-6 h-6" /> },
        { name: 'Instagram', href: contact.social.instagram, icon: <InstagramIcon className="w-6 h-6" /> },
        { name: 'TikTok', href: contact.social.tiktok, icon: <TikTokIcon className="w-6 h-6" /> },
    ];

    return (
        <div>
            <PageHeader 
                title={courseInfo ? "Inscripción al Curso" : "Ponte en Contacto"} 
                subtitle={courseInfo 
                    ? `¡Perfecto! Completa tus datos para inscribirte en ${courseInfo.course}` 
                    : "Estamos aquí para responder tus preguntas. ¡Hablemos y empecemos tu formación!"
                } 
            />

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                            <h2 className="text-3xl font-bold text-slate-800 mb-6">
                                {courseInfo ? "Formulario de Inscripción" : "Envíanos un Mensaje"}
                            </h2>
                            
                            {/* Información del curso si viene de una inscripción */}
                            {courseInfo && (
                                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-bold text-blue-800 text-lg mb-3">Curso Seleccionado</h3>
                                    <p className="text-blue-700 font-semibold text-lg mb-3">{courseInfo.course}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                        <div>
                                            <p className="text-blue-600 font-semibold">Área</p>
                                            <p className="text-blue-800">{courseInfo.area}</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-600 font-semibold">Instructor</p>
                                            <p className="text-blue-800">{courseInfo.instructor}</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-600 font-semibold">Duración</p>
                                            <p className="text-blue-800">{courseInfo.duration} ({courseInfo.hours})</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Nombre Completo *
                                        </label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name" 
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                            placeholder="Tu nombre completo" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email *
                                        </label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                            placeholder="tu@email.com" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Teléfono *
                                    </label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone" 
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        placeholder="Tu número de teléfono" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Mensaje *
                                    </label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows={5} 
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none" 
                                        placeholder="¿En qué podemos ayudarte?"
                                    ></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        type="submit" 
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        {courseInfo ? "Enviar por WhatsApp" : "Enviar Mensaje"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                             <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 h-full">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Nuestra Información</h3>
                                <div className="space-y-6">
                                    {contactInfo.map(item => (
                                        <div key={item.title} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-slate-700">{item.title}</h4>
                                                {item.href ? (
                                                     <a href={item.href} className="text-slate-600 hover:text-blue-600 transition">{item.value}</a>
                                                ) : (
                                                    <p className="text-slate-600">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-3">Síguenos en Redes</h4>
                                     <div className="flex space-x-4">
                                        {socialLinks.map(link => (
                                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
                                                {link.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="w-full h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127484.99691764109!2d-79.07689584347539!3d-2.900128292150913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd181242cf38bd%3A0x853b0a0a931448b2!2sCuenca%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1693344685756!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de TECNIFORMACIÓN S.A.S en Cuenca, Ecuador"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;