import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

export default function HomeBlog() {
  const { t } = useLanguage();

  // Safely get posts, default to empty array if undefined
  const posts = t.blog?.posts || [];
  // Show only the first 2 posts on Home
  const homePosts = posts.slice(0, 2);

  return (
    <section id="blog" className="py-40 bg-white">
      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient-primary text-lg fw-bold uppercase mb-4 d-block tracking-widest">
              {t.blog.title}
            </span>
            <h2 className="display-6 fw-bold text-dark mb-4">
              {t.blog.subtitle}
            </h2>
          </motion.div>
        </div>

        <Row className="g-5 justify-content-center">
          {homePosts.map((post, index) => (
            <Col md={6} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-100"
              >
                <div className="h-100 border border-light rounded-card overflow-hidden shadow-card hover:shadow-lg transition bg-white group">
                  
                  {/* Image */}
                  <div className="overflow-hidden position-relative" style={{ height: '250px' }}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-100 h-100 object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => { 
                        e.target.style.display = 'none'; // Hide broken image
                        e.target.parentNode.style.backgroundColor = '#e2e8f0'; // Grey fallback
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 d-flex flex-column h-100">
                    <div className="d-flex align-items-center gap-2 text-secondary text-sm mb-3">
                      <Calendar size={16} className="text-primary" />
                      <span>{post.date}</span>
                    </div>
                    
                    <h3 className="h4 fw-bold text-dark mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-body mb-4 leading-relaxed flex-grow-1">
                      {post.excerpt}
                    </p>

                    {/* Link to Main Blog Page */}
                    <Link to={`/blog/${post.id}`} className="text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2 align-self-start hover:translate-x-1 transition">
                      {t.blog.readMore} <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-12">
          <Link to="/blog" className="btn-primary-custom text-decoration-none d-inline-flex align-items-center gap-2">
            {t.blog.viewAll} <ArrowRight size={18} />
          </Link>
        </div>

      </Container>
    </section>
  );
}