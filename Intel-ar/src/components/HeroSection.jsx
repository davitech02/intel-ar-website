import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// REMOVED UNUSED MOTION IMPORT
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import heroBg from '../assets/hero.jpg'; 

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="position-relative d-flex align-items-center overflow-hidden" style={{ minHeight: '100vh' }}>
      
      {/* Background Image Wrapper */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
          backgroundImage: `url(${heroBg})`, 
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}></div>
      </div>

      <Container className="position-relative z-10 pt-5 pb-5" style={{ marginTop: '80px' }}>
        <Row className="align-items-center">
          <Col lg={8}>
            {/* CHANGED motion.div TO STANDARD div TO FIX ERROR */}
            <div>
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

              <div className="d-flex flex-column flex-sm-row gap-3">
                
                {/* Button 1: Consultation Mode */}
                <Button 
                  as={Link} 
                  to="/contact" 
                  state={{ mode: 'consultation' }}
                  className="btn-primary-custom d-flex align-items-center justify-content-center gap-2"
                >
                  {t.hero.btn_main} <ArrowRight size={18} />
                </Button>
                
                {/* Button 2: Expert Mode */}
                <Button 
                  as={Link} 
                  to="/contact" 
                  state={{ mode: 'expert' }}
                  variant="outline-light" 
                  className="px-4 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center"
                >
                  {t.hero.btn_sec}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}