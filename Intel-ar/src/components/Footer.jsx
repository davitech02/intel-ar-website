import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { 
  Facebook, Twitter, Linkedin, Instagram, 
  MapPin, Phone, Mail, ArrowRight, Briefcase 
} from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { icon: <Linkedin size={20} />, link: "#" },
    { icon: <Twitter size={20} />, link: "#" },
    { icon: <Facebook size={20} />, link: "#" },
    { icon: <Instagram size={20} />, link: "#" }
  ];

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.experts, href: "#experts" },
    { label: t.nav.about, href: "#about" },
    { label: "FAQ", href: "#faq" }, 
    { label: t.nav.contact, href: "#contact" }
  ];

  return (
    <footer 
      className="bg-dark text-white border-top border-white/10" 
      style={{ 
        backgroundColor: '#0f172a', 
        paddingTop: '100px', 
        paddingBottom: '50px'
      }}
    >
      <Container>
        <Row className="gy-5 justify-content-between">
          
          {/* COLUMN 1: BRAND & CONTACT */}
          <Col lg={4}>
            {/* Logo + Name */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Intel-Ar Logo" 
                style={{ height: '40px', width: 'auto' }}
              />
              <span className="fw-bold fs-4 tracking-tight">
                INTEL-AR <span className="text-primary">INC.</span>
              </span>
            </div>
            
            <p className="text-gray-400 mb-4 leading-relaxed">
              {t.footer.desc}
            </p>

            {/* Contact Details */}
            <div className="d-flex flex-column gap-3 text-gray-400">
              <div className="d-flex align-items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>{t.footer.contactInfo.address}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={18} className="text-primary" />
                <span>{t.footer.contactInfo.phone}</span>
              </div>
              {/* General Info Email */}
              <div className="d-flex align-items-center gap-2">
                <Mail size={18} className="text-primary" />
                <a href={`mailto:${t.footer.contactInfo.email}`} className="text-gray-400 text-decoration-none hover:text-white transition">
                  {t.footer.contactInfo.email}
                </a>
              </div>
              {/* Recruitment Email (NEW) */}
              <div className="d-flex align-items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                <a href={`mailto:${t.footer.contactInfo.jobs}`} className="text-gray-400 text-decoration-none hover:text-white transition">
                  {t.footer.contactInfo.jobs}
                </a>
              </div>
            </div>
          </Col>

          {/* COLUMN 2: QUICK LINKS */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold text-white mb-4">{t.footer.labels.links}</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 text-decoration-none d-flex align-items-center gap-2 transition hover:text-white hover:translate-x-1"
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <ArrowRight size={14} className="text-primary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* COLUMN 3: SOCIALS & LEGAL */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold text-white mb-4">{t.footer.labels.follow}</h5>
            
            <div className="d-flex gap-3 mb-4">
              {socials.map((social, index) => (
                <a 
                  key={index} 
                  href={social.link}
                  className="bg-white/10 p-3 rounded-circle text-white transition hover:bg-primary hover:scale-110 d-flex align-items-center justify-content-center"
                  style={{ width: '45px', height: '45px' }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-gray-500 text-sm">
              &copy; {year} Intel-Ar Inc. <br />
              {t.footer.rights}
            </p>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}