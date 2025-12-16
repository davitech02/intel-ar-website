import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom'; 
import { Calendar } from 'lucide-react';

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-20 bg-light min-h-screen">
      <Container>
        <div className="text-center mb-16">
          <h1 className="fw-bold display-4 mb-4">{t.blog.title}</h1>
          <p className="lead text-secondary">{t.blog.subtitle}</p>
        </div>

        <Row className="g-5">
          {t.blog.posts.map((post) => (
            <Col md={6} lg={4} key={post.id}>
              <Link to={`/blog/${post.id}`} className="text-decoration-none">
                <div className="h-100 border border-light rounded-card overflow-hidden shadow-card bg-white hover:shadow-lg transition group">
                  
                  {/* Image Container */}
                  <div className="overflow-hidden position-relative" style={{ height: '220px' }}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-100 h-100 transition duration-500 group-hover:scale-105"
                      // --- FIX IS HERE ---
                      style={{ objectFit: 'cover' }}
                      onError={(e) => { e.target.style.backgroundColor = '#e2e8f0'; }}
                    />
                  </div>

                  <div className="p-4">
                    <div className="d-flex align-items-center gap-2 text-secondary text-sm mb-3">
                      <Calendar size={16} className="text-primary" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="h5 fw-bold text-dark mb-3 group-hover:text-primary transition">
                      {post.title}
                    </h3>
                    <p className="text-body text-sm mb-0">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}