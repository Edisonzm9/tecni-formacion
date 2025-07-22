import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, InstagramIcon, TikTokIcon } from './Icons';

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 text-center text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        <div className="relative container mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                {title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
            </p>
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

            // Pre-llenar el mensaje con un mensaje simple
            const defaultMessage = `Hola, me gustaría recibir más información sobre horarios, costos y proceso de inscripción.`;

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
        const baseMessage = `Hola, soy ${formData.name} y estoy interesado en inscribirme en el curso: ${courseInfo?.course || 'Formación Técnica'}

Mis datos de contacto:
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}`;

        const courseInfoSection = courseInfo ? `

Información del curso:
• Área: ${courseInfo.area}
• Instructor: ${courseInfo.instructor}
• Duración: ${courseInfo.duration}
• Horas: ${courseInfo.hours}
• Enfoque: ${courseInfo.focus}` : '';

        const defaultMessage = 'Hola, me gustaría recibir más información sobre horarios, costos y proceso de inscripción.';
        const additionalMessage = formData.message && formData.message !== defaultMessage ? `

Mensaje adicional: ${formData.message}` : '';

        const closingMessage = `

Por favor, me gustaría recibir más información sobre horarios, costos y proceso de inscripción.`;

        return baseMessage + courseInfoSection + additionalMessage + closingMessage;
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
        { 
            icon: <MapPinIcon className="w-8 h-8 text-blue-500" />, 
            title: "Ubicación", 
            value: contact.address,
            description: "Visítanos en nuestra sede"
        },
        { 
            icon: <MailIcon className="w-8 h-8 text-blue-500" />, 
            title: "Correo Electrónico", 
            value: contact.email, 
            href: `mailto:${contact.email}`,
            description: "Escríbenos directamente"
        },
        { 
            icon: <PhoneIcon className="w-8 h-8 text-blue-500" />, 
            title: "Teléfono", 
            value: contact.phone, 
            href: `tel:${contact.whatsapp}`,
            description: "Llámanos cuando quieras"
        },
    ];

    const socialLinks = [
        { name: 'Facebook', href: contact.social.facebook, icon: <FacebookIcon className="w-6 h-6" /> },
        { name: 'Instagram', href: contact.social.instagram, icon: <InstagramIcon className="w-6 h-6" /> },
        { name: 'TikTok', href: contact.social.tiktok, icon: <TikTokIcon className="w-6 h-6" /> },
    ];

    return (
        <div id="contact" className="bg-gradient-to-br from-slate-50 to-blue-50">
            <PageHeader 
                title={courseInfo ? "Inscripción al Curso" : "Ponte en Contacto"} 
                subtitle={courseInfo 
                    ? `¡Perfecto! Completa tus datos para inscribirte en ${courseInfo.course}` 
                    : "Estamos aquí para responder tus preguntas. ¡Hablemos y empecemos tu formación!"
                } 
            />

            <section className="py-20 relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                
                <div className="container mx-auto px-6 relative">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Contact Info - Left Side */}
                        <div className="space-y-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl font-bold text-slate-800 mb-4">
                                    Contáctanos
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Estamos aquí para responder tus preguntas y ayudarte a comenzar tu formación profesional.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div 
                                        key={item.title} 
                                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 mb-1">{item.description}</p>
                                                {item.href ? (
                                                    <a 
                                                        href={item.href} 
                                                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-lg"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-slate-700 font-semibold text-lg">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Media */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Síguenos en Redes Sociales</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map(link => (
                                        <a 
                                            key={link.name} 
                                            href={link.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-white/20 rounded-xl p-3">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Horarios de Atención</h3>
                                        <p className="text-blue-100">Lunes a Viernes</p>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold">8:00 AM - 6:00 PM</p>
                                <p className="text-blue-100 mt-2">Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>

                        {/* Contact Form - Right Side */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                    {courseInfo ? "Formulario de Inscripción" : "Envíanos un Mensaje"}
                                </h2>
                                <p className="text-slate-600">
                                    {courseInfo ? "Completa tus datos y nos pondremos en contacto contigo" : "Cuéntanos en qué podemos ayudarte"}
                                </p>
                            </div>
                            
                            {/* Información del curso si viene de una inscripción */}
                            {courseInfo && (
                                <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                    <h3 className="font-bold text-blue-800 text-lg mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Curso Seleccionado
                                    </h3>
                                    <p className="text-blue-700 font-semibold text-lg mb-4">{courseInfo.course}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="bg-white/50 rounded-lg p-3">
                                            <p className="text-blue-600 font-semibold">Área</p>
                                            <p className="text-blue-800">{courseInfo.area}</p>
                                        </div>
                                        <div className="bg-white/50 rounded-lg p-3">
                                            <p className="text-blue-600 font-semibold">Instructor</p>
                                            <p className="text-blue-800">{courseInfo.instructor}</p>
                                        </div>
                                        <div className="bg-white/50 rounded-lg p-3">
                                            <p className="text-blue-600 font-semibold">Duración</p>
                                            <p className="text-blue-800">{courseInfo.duration} ({courseInfo.hours})</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="group">
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
                                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50 hover:bg-white" 
                                            placeholder="Tu nombre completo" 
                                        />
                                    </div>
                                    <div className="group">
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
                                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50 hover:bg-white" 
                                            placeholder="tu@email.com" 
                                        />
                                    </div>
                                </div>
                                <div className="group">
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
                                        className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50 hover:bg-white" 
                                        placeholder="Tu número de teléfono" 
                                    />
                                </div>
                                <div className="group">
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
                                        className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50 hover:bg-white resize-none" 
                                        placeholder="¿En qué podemos ayudarte?"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-500/20"
                                >
                                    {courseInfo ? "Enviar por WhatsApp" : "Enviar Mensaje"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Map Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10"></div>
                <div className="w-full h-96 relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127484.99691764109!2d-79.07689584347539!3d-2.900128292150913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd181242cf38bd%3A0x853b0a0a931448b2!2sCuenca%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1693344685756!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de TECNIFORMACIÓN S.A.S en Cuenca, Ecuador"
                        className="rounded-t-3xl"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;