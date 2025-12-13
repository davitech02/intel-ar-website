import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Database, TrendingUp, Cpu, Zap } from 'lucide-react';

export default function AboutUs() {
  const { t } = useLanguage();

  const icons = [
    <Database size={24} className="text-primary" />,
    <TrendingUp size={24} className="text-primary" />,
    <Cpu size={24} className="text-primary" />,
    <Zap size={24} className="text-primary" />
  ];

  return (
    <>
      {/* =============================================
          SECTION 1: PURPOSE
          ============================================= */}
      <section id="about" className="py-32 bg-white">
        <Container>
          <Row className="align-items-center gy-5">
            
            {/* TEXT COLUMN */}
            <Col lg={6}>
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient-primary text-lg fw-bold uppercase mb-4 d-block tracking-widest">
                  {t.about.purpose_title}
                </span>
                
                <h2 className="text-dark mb-4 display-6 fw-bold">
                  {/* --- FIX IS HERE: Uses translation variable now --- */}
                  {t.about.purpose_heading}
                </h2>

                <p className="text-body mb-4" style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: 400 }}>
                  "{t.about.purpose_text}"
                </p>
                
                <div className="h-1 w-20 bg-primary rounded-pill"></div>
              </motion.div>
            </Col>

            {/* IMAGE COLUMN */}
            <Col lg={6}>
              <div className="rounded-card overflow-hidden shadow-card border border-light">
                <img 
                  src="/images/about-purpose.jpg" 
                  alt="Our Purpose" 
                  className="w-100"
                  style={{ 
                    minHeight: '400px', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* =============================================
          SECTION 2: VISION
          ============================================= */}
      <section className="py-32" style={{ backgroundColor: '#f8fafc' }}>
        <Container>
          <Row className="align-items-center gy-5">
            
            {/* IMAGE COLUMN */}
            <Col lg={6} className="order-2 order-lg-1">
              <div className="rounded-card overflow-hidden shadow-card border border-white h-100">
                <img 
                  src="/images/about-vision.jpg" 
                  alt="Our Vision" 
                  className="w-100"
                  style={{ 
                    minHeight: '500px', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
              </div>
            </Col>

            {/* TEXT COLUMN */}
            <Col lg={6} className="order-1 order-lg-2 ps-lg-5">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-dark mb-3 fw-bold">
                  {t.about.vision_title}
                </h2>
                <p className="text-secondary mb-5" style={{ fontSize: '1.05rem' }}>
                  {t.about.vision_intro}
                </p>

                <Row className="g-4">
                  {t.about.pillars.map((pillar, index) => (
                    <Col md={6} key={index}>
                      <div className="bg-white p-4 rounded-card shadow-sm border h-100 transition hover:shadow-lg hover:-translate-y-1">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-50 rounded-circle text-primary">
                            {icons[index]}
                          </div>
                          <h5 className="fw-bold m-0 fs-6 text-dark">{pillar.title}</h5>
                        </div>
                        <p className="text-muted small m-0 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* =============================================
          SECTION 3: TALENT
          ============================================= */}
      <section className="py-32 bg-white">
        <Container>
          <div className="bg-primary text-white p-5 rounded-card shadow-card position-relative overflow-hidden">
            <div className="position-absolute top-0 end-0 bg-white opacity-10 rounded-circle" style={{ width: '300px', height: '300px', transform: 'translate(30%, -30%)' }}></div>
            
            <Row className="align-items-center position-relative z-10">
              <Col lg={8} className="mb-4 mb-lg-0">
                <h3 className="fw-bold text-white mb-3">
                  {t.about.talent_title}
                </h3>
                <p className="text-blue-100 fs-5 mb-0" style={{ fontWeight: 300 }}>
                  {t.about.talent_desc}
                </p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Button href="#experts" className="btn bg-white text-primary fw-bold px-5 py-3 border-0 rounded-pill shadow-sm hover:shadow-md transition">
                  {t.about.talent_btn}
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}