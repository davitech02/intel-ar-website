import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// --- FIXED: Removed the unused import 'logoImg' ---

export default function Navigation() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const isSolid = scrolled || !isHome;

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`transition-all duration-300 py-3 ${isSolid ? 'navbar-custom py-2' : 'bg-transparent py-4'}`}
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3">
          <img 
            src="/images/logo.png" // Direct path to public folder
            alt="Intel-Ar Logo" 
            style={{ height: '40px', width: 'auto' }} 
          />
          <span className={`fw-bold fs-4 tracking-tight ${isSolid ? 'text-dark' : 'text-white'}`}>
            INTEL-AR <span className="text-primary">INC.</span>
          </span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: 'white' }} />
        
        <Navbar.Collapse id="basic-navbar-nav" className="mt-3 lg:mt-0 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg">
          <Nav className="mx-auto align-items-center">
            
            {/* NEW HOME LINK */}
            <Nav.Link as={Link} to="/" className={`mx-3 font-medium text-sm uppercase tracking-wide ${isSolid ? 'text-dark' : 'text-dark lg:text-white'}`}>
              {t.nav.home}
            </Nav.Link>

            <Nav.Link as={Link} to="/services" className={`mx-3 font-medium text-sm uppercase tracking-wide ${isSolid ? 'text-dark' : 'text-dark lg:text-white'}`}>
              {t.nav.services}
            </Nav.Link>

            <Nav.Link as={Link} to="/experts" className={`mx-3 font-medium text-sm uppercase tracking-wide ${isSolid ? 'text-dark' : 'text-dark lg:text-white'}`}>
              {t.nav.experts}
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className={`mx-3 font-medium text-sm uppercase tracking-wide ${isSolid ? 'text-dark' : 'text-dark lg:text-white'}`}>
              {t.nav.about}
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className={`mx-3 font-medium text-sm uppercase tracking-wide ${isSolid ? 'text-dark' : 'text-dark lg:text-white'}`}>
              {t.nav.contact}
            </Nav.Link>

          </Nav>
          
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 justify-content-center">
            <button 
              onClick={toggleLang} 
              className={`border rounded-full px-3 py-1 text-xs font-bold uppercase flex items-center gap-2 ${isSolid ? 'border-dark text-dark' : 'border-dark text-dark lg:border-white lg:text-white'}`}
            >
              <Globe size={14} />
              {lang}
            </button>

            <Button as={Link} to="/contact" className="btn-primary-custom btn-sm text-decoration-none">
              {t.nav.cta}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}