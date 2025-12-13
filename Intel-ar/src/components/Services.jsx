import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { BrainCircuit, BarChart3, Settings2, Briefcase } from 'lucide-react';

export default function Services() {
  const { t } = useLanguage();

  const icons = [
    <BrainCircuit size={32} className="text-white" />,
    <BarChart3 size={32} className="text-white" />,
    <Settings2 size={32} className="text-white" />,
    <Briefcase size={32} className="text-white" />
  ];

  const colors = [
    "bg-blue-600", 
    "bg-indigo-600", 
    "bg-purple-600", 
    "bg-slate-800"  
  ];

  // --- FIX: USE PUBLIC FOLDER PATHS (Strings) ---
  // Ensure your images are inside the 'public/images/' folder
  const serviceImages = [
    "/images/service-ai.jpg",
    "/images/service-bi.jpg",
    "/images/service-auto.jpg",
    "/images/service-experts.jpg"
  ];

  return (
    <section id="services" className="py-52" style={{ backgroundColor: '#f8fafc' }}>
      <Container>
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary fs-3 fw-bolder uppercase mb-4 d-block tracking-widest">
              {t.services.title}
            </span>
            <h2 className="display-6 fw-bold text-dark mb-3">
              {t.services.subtitle}
            </h2>
          </motion.div>
        </div>

        {/* Grid */}
        <Row className="g-5">
          {t.services.list.map((service, index) => (
            <Col md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-100"
              >
                {/* CARD CONTAINER */}
                <div className="bg-white p-0 h-100 rounded-card shadow-card border border-light transition hover:-translate-y-2 hover:shadow-lg group overflow-hidden">
                  
                  {/* --- IMAGE SECTION --- */}
                  <div className="mb-0 overflow-hidden position-relative">
                    <img 
                      src={serviceImages[index]} 
                      alt={service.title} 
                      className="w-100 object-cover transition duration-500 group-hover:scale-105"
                      style={{ height: '220px',objectFit: 'cover' }}
                      // Fallback: If image is missing, show a grey box instead of crashing
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = '#e2e8f0';
                        e.target.parentNode.style.height = '100px';
                      }} 
                    />
                  </div>

                  {/* --- CONTENT SECTION --- */}
                  <div className="p-4 pt-3">
                    
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg d-inline-flex align-items-center justify-content-center shadow-sm ${colors[index]}`}>
                        {icons[index]}
                      </div>
                      
                      {/* BOLD TITLE */}
                      <h3 className="h5 fw-bolder text-dark m-0 group-hover:text-primary transition">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* DESCRIPTION */}
                    <p className="text-secondary mb-4 leading-relaxed" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {service.desc}
                    </p>

                    <a href="#contact" className="text-primary fw-bold text-sm uppercase tracking-wide text-decoration-none d-flex align-items-center gap-2">
                      En savoir plus <span className="text-lg">→</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}