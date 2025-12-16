import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ContactUs() {
  const { t } = useLanguage();
  
  const location = useLocation();
  const mode = location.state?.mode || 'default'; 

  const hideProfileSelector = mode === 'consultation';
  const hideMessageField = mode === 'expert';

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    profile: '',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    let submissionData = { ...formData };

    if (hideMessageField) {
      submissionData.message = `[EXPERT REQUEST] User is interested in profile: ${formData.profile || 'General Expert'}`;
    }

    try {
      const API_BASE = "https://intel-ar-website-backend.onrender.com"; 
      
      console.log("Attempting to connect to:", `${API_BASE}/api/contact`); // Debugging log

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ company: '', name: '', email: '', phone: '', profile: '', message: '' });
      } else {
        console.error("Server Error:", result);
        setStatus('error');
      }
    } catch (error) {
      console.error("Network Error Details:", error);
      alert("Erreur de connexion. Vérifiez que le backend est en ligne.");
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-40" style={{ backgroundColor: '#f8fafc' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center mb-16">
             <div>
              <h2 className="display-6 fw-bold text-dark mb-3">
                {t.contact.title}
              </h2>
              <p className="text-secondary fs-5">
                {t.contact.subtitle}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="bg-white p-5 rounded-card shadow-card border border-light">
              
              {status === 'success' ? (
                <div className="text-center py-5">
                  <div className="mb-4 text-success d-inline-block p-3 rounded-circle bg-green-50">
                    <CheckCircle size={60} />
                  </div>
                  <h3 className="h4 fw-bold text-dark mb-3">Message Envoyé !</h3>
                  <p className="text-secondary mb-4">
                    Merci. Votre demande a été envoyée à notre équipe.
                  </p>
                  <Button variant="outline-primary" onClick={() => setStatus('idle')}>
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                
                <Form onSubmit={handleSubmit}>
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold text-dark text-sm">{t.contact.form.company}</Form.Label>
                        <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} className="p-3 bg-light border-0 rounded-3" required />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold text-dark text-sm">{t.contact.form.name}</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} className="p-3 bg-light border-0 rounded-3" required />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold text-dark text-sm">{t.contact.form.email}</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} className="p-3 bg-light border-0 rounded-3" required />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold text-dark text-sm">{t.contact.form.phone}</Form.Label>
                        <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} className="p-3 bg-light border-0 rounded-3" />
                      </Form.Group>
                    </Col>

                    {!hideProfileSelector && (
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="fw-bold text-dark text-sm">
                            {t.experts.title} (Optionnel)
                          </Form.Label>
                          <Form.Select name="profile" value={formData.profile} onChange={handleChange} className="p-3 bg-light border-0 rounded-3">
                            <option value="">Sélectionnez un profil...</option>
                            {t.experts.list.map((expert, index) => (
                              <option key={index} value={expert}>{expert}</option>
                            ))}
                            <option value="Autre">Autre / Je ne sais pas encore</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}

                    {!hideMessageField && (
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="fw-bold text-dark text-sm">{t.contact.form.message}</Form.Label>
                          <Form.Control as="textarea" rows={4} name="message" value={formData.message} onChange={handleChange} className="p-3 bg-light border-0 rounded-3" required />
                        </Form.Group>
                      </Col>
                    )}
                    
                    <Col xs={12}>
                      <Button type="submit" className="btn-primary-custom w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-2" disabled={status === 'submitting'}>
                        {status === 'submitting' ? <><Loader2 size={20} className="animate-spin" /> Envoi...</> : t.contact.form.btn}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .bg-green-50 { background-color: #f0fdf4; }`}</style>
    </section>
  );
}