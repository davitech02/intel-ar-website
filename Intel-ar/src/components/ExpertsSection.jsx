import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { UserCheck, Clock } from 'lucide-react';

export default function ExpertsSection() {
  const { t } = useLanguage();

  return (
    <section id="experts" className="py-40 bg-white">
      <Container>
        <div className="text-center mb-16">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient-primary text-lg fw-bold uppercase mb-4 d-block tracking-widest">
              {t.experts.title}
            </span>
            <h2 className="display-6 fw-bold text-dark mb-4">
              {t.experts.subtitle}
            </h2>
            <div className="d-inline-flex align-items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-pill fw-bold">
              <Clock size={18} /> {t.experts.benefit}
            </div>
          </motion.div>
        </div>

        <Row className="g-4">
          {t.experts.list.map((profile, index) => (
            <Col md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-4 border border-light rounded-card shadow-sm hover:shadow-card transition hover:-translate-y-1 bg-white h-100 d-flex align-items-center gap-4">
                  <div className="p-3 bg-light rounded-circle text-primary">
                    <UserCheck size={28} />
                  </div>
                  <h4 className="h5 fw-bold text-dark m-0">{profile}</h4>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}