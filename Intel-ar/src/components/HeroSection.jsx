import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'; 
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
// 1. ADD LINK IMPORT
import { Link } from 'react-router-dom';

// Ensure this path matches your file
import heroBg from '../assets/hero.jpg'; 

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="position-relative d-flex align-items-center overflow-hidden" style={{ minHeight: '100vh' }}>
      
      {/* Background Image Wrapper */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          backgroundImage: `url(${heroBg})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay: Dark Blue/Black with opacity */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(15, 23, 42, 0.5)' // Adjusted transparency
        }}></div>
      </div>

      <Container className="position-relative z-10 pt-5 pb-5" style={{ marginTop: '80px' }}>
        <Row className="align-items-center">
          <Col lg={8}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                 <span className="d-inline-block py-2 px-3 rounded bg-primary text-white text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
                  {t.hero.sub}
                </span>
              </div>
              
              <h1 className="fw-bold text-white mb-4 display-3">
                {t.hero.title}
              </h1>
              
              <h2 className="fw-bold text-info mb-4 h3">
                {t.hero.highlight}
              </h2>
              
              <p className="lead text-light mb-5" style={{ maxWidth: '600px', opacity: 0.9 }}>
                {t.hero.desc}
              </p>

              {/* 2. BUTTONS FIX: Responsive flex-column on mobile, row on desktop */}
              <div className="d-flex flex-column flex-sm-row gap-3">
                
                {/* Button 1: Gradient - Links to Contact */}
                <Button 
                  as={Link} 
                  to="/contact" 
                  className="btn-primary-custom d-flex align-items-center justify-content-center gap-2"
                >
                  {t.hero.btn_main} <ArrowRight size={18} />
                </Button>
                
                {/* Button 2: White Outline - Links to Contact */}
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="outline-light" 
                  className="px-4 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center"
                >
                  {t.hero.btn_sec}
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}