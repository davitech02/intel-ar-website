import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams(); // Get the ID from the URL (e.g., "1")
  const { t } = useLanguage();

  // Find the specific post
  // We use parseInt because the URL ID is a string ("1") but data ID is a number (1)
  const post = t.blog.posts.find((p) => p.id === parseInt(id));

  // If post doesn't exist (wrong URL), show error
  if (!post) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-gray-300">404</h1>
          <p className="lead text-secondary mb-4">Article non trouvé / Post not found</p>
          <Link to="/blog" className="btn btn-primary-custom">
            Retour au Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            
            {/* BACK BUTTON */}
            <Link to="/blog" className="text-decoration-none text-secondary d-flex align-items-center gap-2 mb-5 hover:text-primary transition">
              <ArrowLeft size={20} /> {t.blog.viewAll || "Back to Blog"}
            </Link>

            {/* HEADER */}
            <span className="text-primary fw-bold uppercase tracking-widest text-sm mb-3 d-block">
              Blog / News
            </span>
            <h1 className="display-4 fw-bold text-dark mb-4 lh-sm">
              {post.title}
            </h1>

            {/* METADATA */}
            <div className="d-flex align-items-center gap-4 text-secondary mb-5 pb-4 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <User size={18} />
                <span>Intel-Ar Team</span>
              </div>
            </div>

            {/* FEATURED IMAGE */}
            <div className="rounded-card overflow-hidden shadow-sm mb-5">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-100 object-cover"
                style={{ height: '400px' }}
                onError={(e) => { e.target.style.backgroundColor = '#e2e8f0'; }}
              />
            </div>

            {/* CONTENT BODY */}
            <div className="fs-5 text-body leading-loose article-content">
              {/* 
                 NOTE: In a real app, this would be rich text. 
                 For now, we just display the content string. 
              */}
              <p>{post.content}</p>
              
              <p className="mt-4">
                <em>
                  (Note: This is a demo text. When you connect a real backend later, 
                  this will be the full article content retrieved from the database.)
                </em>
              </p>
            </div>

            {/* SHARE / CTA FOOTER */}
            <div className="mt-5 pt-5 border-top">
              <h4 className="fw-bold text-dark mb-3">Intéressé par ce sujet ?</h4>
              <p className="text-secondary mb-4">Contactez nos experts pour en savoir plus sur l'implémentation de ces solutions.</p>
              <Link to="/contact" className="btn btn-primary-custom">
                Contacter un expert
              </Link>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
}