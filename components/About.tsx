import React from 'react';
import { COMPANY_INFO } from '../constants';
import { HandshakeIcon, SparklesIcon, GlobeAltIcon, ScaleIcon, LightBulbIcon, ArrowTrendingUpIcon } from './Icons';

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-slate-800 py-24 text-center text-white bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black">{title}</h1>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ValueCard: React.FC<{icon: React.ReactNode, name: string, description: string}> = ({ icon, name, description }) => (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-blue-500">{icon}</div>
            <h4 className="text-xl font-bold text-slate-800">{name}</h4>
        </div>
        <p className="text-slate-600 text-sm">{description}</p>
    </div>
);

const About: React.FC = () => {
    const valueIcons = [
        <HandshakeIcon className="w-7 h-7" />,
        <SparklesIcon className="w-7 h-7" />,
        <GlobeAltIcon className="w-7 h-7" />,
        <ScaleIcon className="w-7 h-7" />,
        <LightBulbIcon className="w-7 h-7" />,
        <ArrowTrendingUpIcon className="w-7 h-7" />
    ];

    return (
        <div>
            <PageHeader title="Sobre TECNIFORMACIÓN S.A.S" subtitle="Conoce nuestra historia, misión y los valores que nos guían hacia la excelencia en formación técnica." />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="section-title">Nuestra Esencia</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">{COMPANY_INFO.about}</p>
                    </div>
                </div>
            </section>
            
            <section className="py-20">
                 <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-stretch">
                        <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-blue-500">
                             <h3 className="text-3xl font-bold text-slate-800 mb-4">Nuestra Misión</h3>
                             <p className="text-slate-600 leading-relaxed">{COMPANY_INFO.mission}</p>
                        </div>
                         <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-orange-500">
                             <h3 className="text-3xl font-bold text-slate-800 mb-4">Nuestra Visión</h3>
                             <p className="text-slate-600 leading-relaxed">{COMPANY_INFO.vision}</p>
                        </div>
                    </div>
                </div>
            </section>

             <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="section-title">Nuestros Valores</h2>
                    <p className="section-subtitle">Estos son los principios que definen nuestra forma de trabajar y enseñar, garantizando una experiencia de calidad para todos.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                        {COMPANY_INFO.values.map((value, index) => (
                           <ValueCard key={value.name} name={value.name} description={value.description} icon={valueIcons[index]}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;