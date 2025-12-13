import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle } from 'lucide-react';

// Ensure the image exists in src/assets/faq.png
import faqImage from '../assets/faq.png'; 

export default function FaqModule() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-40 bg-white">
      <Container>
        <Row className="align-items-center gy-5">
          
          {/* LEFT: IMAGE */}
          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="position-relative">
                {/* Main Image */}
                <div className="rounded-card overflow-hidden shadow-card border border-light">
                  <img 
                    src={faqImage} 
                    alt="FAQ" 
                    className="w-100 object-cover"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                </div>

                {/* Floating Badge */}
                <div className="position-absolute bottom-0 start-0 m-4 p-4 bg-primary text-white rounded-xl shadow-lg" style={{ maxWidth: '200px' }}>
                  <HelpCircle size={32} className="mb-2" />
                  <p className="fw-bold m-0 lh-sm">Support 24/7</p>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* RIGHT: ACCORDION */}
          <Col lg={7} className="ps-lg-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gradient-primary text-lg fw-bold uppercase mb-3 d-block tracking-widest">
                {t.faq.title}
              </span>
              <h2 className="display-6 fw-bold text-dark mb-5">
                {t.faq.subtitle}
              </h2>

              {/* MODERN ACCORDION */}
              <Accordion defaultActiveKey="0" flush className="modern-accordion">
                {t.faq.questions.map((item, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index} className="mb-4 border-0 bg-transparent">
                    <Accordion.Header className="rounded-3 overflow-hidden">
                      <span className="fw-bold fs-5">{item.q}</span>
                    </Accordion.Header>
                    <Accordion.Body className="bg-white border border-light rounded-bottom-3 text-secondary fs-6 leading-relaxed p-4 shadow-sm">
                      {item.a}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>

            </motion.div>
          </Col>
        </Row>
      </Container>
      
      {/* --- CUSTOM CSS FOR BLUE BACKGROUND & SHADOWS --- */}
      <style>{`
        /* 1. The Closed Question Bar (Blue Background) */
        .modern-accordion .accordion-button {
          background-color: #2563eb; /* Primary Blue */
          color: white;
          padding: 1.5rem;
          border-radius: 16px;
          /* Strong Shadow Effect */
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4); 
          font-weight: 600;
          transition: all 0.3s ease;
        }

        /* 2. The Open Question Bar (Darker Blue) */
        .modern-accordion .accordion-button:not(.collapsed) {
          background-color: #1e3a8a; /* Navy Blue */
          color: white;
          box-shadow: 0 15px 30px -5px rgba(30, 58, 138, 0.5);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        /* 3. The Arrow Icon (Make it White) */
        .modern-accordion .accordion-button::after {
          filter: invert(1) grayscale(100%) brightness(200%);
          transform: scale(1.2);
        }

        /* 4. Remove default focus outlines */
        .modern-accordion .accordion-button:focus {
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4); 
          border-color: transparent;
        }

        /* 5. Space between items */
        .modern-accordion .accordion-item {
          margin-bottom: 20px;
        }
      `}</style>
    </section>
  );
}