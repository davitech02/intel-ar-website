/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function ImpactSection() {
  const { t } = useLanguage();

  return (
    // FIX 1: Increased padding from py-32 to py-40
    <section className="py-40 bg-primary position-relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="position-absolute top-0 start-0 bg-white opacity-10 rounded-circle" style={{ width: '400px', height: '400px', transform: 'translate(-50%, -50%)' }}></div>
      
      <Container className="position-relative z-10">
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white fw-bold display-6 mb-1"
            >
              {t.impact.title}
            </motion.h2>
          </Col>
        </Row>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {t.impact.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // Keeping rounded-pill as requested previously
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-pill px-5 py-3 text-white d-flex align-items-center gap-3 shadow-lg hover:bg-white/20 transition cursor-default"
              style={{ minWidth: '240px' }}
            >
              <div className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center">
                <CheckCircle2 size={18} className="text-primary" />
              </div>
              <span className="fw-bold fs-6">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}