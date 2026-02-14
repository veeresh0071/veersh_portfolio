import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Certifications.css';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState('All');

  const certifications = [
    {
      id: 1,
      title: 'Machine Learning Certification',
      issuer: 'Coursera / Stanford University',
      date: 'Completed 2024',
      image: '/ml.png',
      description: 'Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, and best practices.',
      skills: ['ML Algorithms', 'Neural Networks', 'Python', 'TensorFlow'],
      category: 'AI/ML',
      verified: true,
      credentialId: 'ML-2024-001'
    },
    {
      id: 2,
      title: 'SQL Database Certification',
      issuer: 'Oracle / MySQL',
      date: 'Completed 2024',
      image: '/sql.png',
      description: 'Advanced SQL certification covering database design, complex queries, optimization, and data management.',
      skills: ['SQL', 'Database Design', 'Query Optimization', 'Data Management'],
      category: 'Database',
      verified: true,
      credentialId: 'SQL-2024-002'
    },
    {
      id: 3,
      title: 'Infosys Certification',
      issuer: 'Infosys Springboard',
      date: 'Completed 2024',
      image: '/infosys.png',
      description: 'Professional certification in software development and enterprise technologies from Infosys.',
      skills: ['Software Development', 'Enterprise Tech', 'Best Practices'],
      category: 'Development',
      verified: true,
      credentialId: 'INF-2024-003'
    },
    {
      id: 4,
      title: 'Data Analytics Certification',
      issuer: 'Google / Coursera',
      date: 'Completed 2024',
      image: '/da.png',
      description: 'Professional data analytics certification covering data cleaning, analysis, visualization, and storytelling.',
      skills: ['Data Analysis', 'Data Visualization', 'Python', 'Tableau'],
      category: 'Data Science',
      verified: true,
      credentialId: 'DA-2024-004'
    }
  ];

  const categories = ['All', 'AI/ML', 'Database', 'Development', 'Data Science'];

  const filteredCerts = filter === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === filter);

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  const handleShare = (cert) => {
    if (navigator.share) {
      navigator.share({
        title: cert.title,
        text: `Check out my ${cert.title} from ${cert.issuer}`,
        url: window.location.href
      });
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  return (
    <section id="certifications" className="certifications-premium">
      {/* Animated Background Particles */}
      <div className="cert-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Ambient Background */}
      <div className="certifications-ambient">
        <div className="ambient-gradient-certifications"></div>
        <div className="ambient-grain-certifications"></div>
      </div>

      <div className="certifications-container-premium">
        {/* Section Title with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2 
            className="certifications-title-premium"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            CERTIFICATIONS
          </motion.h2>

          <motion.p
            className="certifications-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Professional certifications and achievements in technology and data science
          </motion.p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div 
          className="cert-filter-pills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`cert-filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Counter */}
        <motion.div 
          className="cert-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="stat-item">
            <motion.span 
              className="stat-number"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {certifications.length}
            </motion.span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-item">
            <motion.span 
              className="stat-number"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {certifications.filter(c => c.verified).length}
            </motion.span>
            <span className="stat-label">Verified</span>
          </div>
          <div className="stat-item">
            <motion.span 
              className="stat-number"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {categories.length - 1}
            </motion.span>
            <span className="stat-label">Categories</span>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div 
          className="certifications-grid"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="cert-card"
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  y: -12,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                layout
              >
                {cert.verified && (
                  <motion.div 
                    className="verified-badge"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: index * 0.1 + 0.3
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified
                  </motion.div>
                )}

                <div className="cert-image-container">
                  <motion.img 
                    src={cert.image} 
                    alt={cert.title}
                    className="cert-image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="cert-overlay"></div>
                  
                  {/* Quick Actions on Hover */}
                  <motion.div 
                    className="cert-quick-actions"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      className="quick-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(cert);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Share"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>

                <div className="cert-content">
                  <motion.span 
                    className="cert-category-badge"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {cert.category}
                  </motion.span>
                  
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">{cert.date}</p>

                  <div className="cert-skills">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <motion.span 
                        key={idx} 
                        className="cert-skill-tag"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: index * 0.1 + idx * 0.05 + 0.4
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  <motion.button
                    className="view-cert-btn"
                    onClick={() => openModal(cert)}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View Certificate
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="cert-modal"
              initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="modal-close" 
                onClick={closeModal}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.button>

              <div className="modal-content">
                <motion.div 
                  className="modal-image-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title}
                    className="modal-cert-image"
                  />
                </motion.div>

                <motion.div 
                  className="modal-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedCert.verified && (
                    <div className="modal-verified-badge">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Verified Certificate
                    </div>
                  )}

                  <h3 className="modal-title">{selectedCert.title}</h3>
                  <p className="modal-issuer">{selectedCert.issuer}</p>
                  <p className="modal-date">{selectedCert.date}</p>
                  
                  <div className="modal-credential">
                    <span className="credential-label">Credential ID:</span>
                    <span className="credential-id">{selectedCert.credentialId}</span>
                  </div>

                  <p className="modal-description">{selectedCert.description}</p>

                  <div className="modal-skills">
                    <h4>Skills Covered:</h4>
                    <div className="modal-skill-tags">
                      {selectedCert.skills.map((skill, idx) => (
                        <motion.span 
                          key={idx} 
                          className="modal-skill-tag"
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: idx * 0.05 + 0.4
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <motion.button
                      className="modal-action-btn primary"
                      onClick={() => handleShare(selectedCert)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                      </svg>
                      Share Certificate
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
