import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Smart Agri Vision',
      category: 'AI',
      description: 'AI-powered crop fertilizer recommendation system using Decision Tree Classifier with 98% accuracy. Features responsive Streamlit web app, real-time predictions, data preprocessing, model training, and label mapping. Integrates sustainable farming practices for green skill development.',
      technologies: ['Python', 'Decision Tree', 'Streamlit', 'ML', 'Data Preprocessing'],
      image: '/smart.jpg',
      liveDemo: '#',
      github: 'https://github.com/veeresh0071/smart_agri_vision',
      featured: true
    },
    {
      id: 2,
      title: 'Plant Disease Analysis',
      category: 'AI',
      description: 'CNN-based plant leaf disease detection system with custom AI engine for disease identification and treatment recommendations. Achieved 2K+ downloads and 4.5/5-star review. Seamlessly connects ML/DL models to dashboard for real-time disease prediction from uploaded images.',
      technologies: ['HTML', 'CSS', 'JS', 'ML', 'DL', 'CNN'],
      image: '/plant.jpg',
      liveDemo: '#',
      github: 'https://github.com/veeresh0071/Plant_disease_analysis_',
      featured: true 
    },
    {
      id: 3,
      title: 'UptoSkilla Web Application',
      category: 'Web',
      description: 'Full-stack web application with Node.js/Express.js backend and REST API with React frontend. Implemented GitHub OAuth for user authentication and data visualization for collaboration. Features responsive design and seamless integration.',
      technologies: ['HTML', 'CSS', 'JS', 'MERN Stack', 'GitHub OAuth'],
      image: '/up.jpg',
      liveDemo: '#',
      github: 'https://github.com/veeresh0071/Up_to_Skills',
      featured: true
    },
    {
      id: 4,
      title: 'Indian Housing Price Predictor',
      category: 'AI',
      description: 'AI-powered real estate investment advisor that predicts property profitability and future values. Features investment classification, 5-year price forecasting, and interactive market dashboards with advanced ML algorithms for accurate predictions.',
      technologies: ['Python', 'XGBoost', 'Streamlit', 'MLflow', 'Pandas', 'Plotly'],
      image: '/house.jpg',
      liveDemo: '#',
      github: 'https://github.com/veeresh0071/indian_housing_prices',
      featured: true
    },
    {
      id: 5,
      title: 'AI Resume Builder',
      category: 'AI',
      description: 'Intelligent resume builder powered by AI that helps users create professional, ATS-friendly resumes with smart suggestions, templates, and optimization features for better job applications and career advancement.',
      technologies: ['React', 'Node.js', 'AI/ML', 'MongoDB', 'Express'],
      image: '/ai.jpg',
      liveDemo: '#',
      github: 'https://github.com/MallamDeepak/AI-Resume-Builder',
      featured: true
    }
  ];

  const categories = ['All', 'Web', 'AI'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-premium">
      {/* Ambient Background */}
      <div className="projects-ambient">
        <div className="ambient-gradient-projects"></div>
        <div className="ambient-grain-projects"></div>
      </div>

      <div className="projects-container-premium">
        {/* Section Title */}
        <motion.h2 
          className="projects-title-premium"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          PROJECTS
        </motion.h2>

        {/* Filter Pills */}
        <motion.div 
          className="filter-pills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid-premium"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card-premium ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                layout
              >
                {project.featured && (
                  <div className="featured-badge-premium">FEATURED</div>
                )}

                {/* Project Image */}
                <div className="project-image-premium">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-image-actual"
                    />
                  ) : (
                    <div className="image-placeholder-premium">
                      {project.category}
                    </div>
                  )}
                  <motion.div 
                    className="image-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Project Content */}
                <div className="project-content-premium">
                  <div className="project-category-label">{project.category}</div>
                  
                  <h3 className="project-title-card">{project.title}</h3>
                  
                  <p className="project-description-premium">{project.description}</p>

                  {/* Tech Stack Pills */}
                  <div className="tech-stack-pills">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions">
                    {project.liveDemo && project.liveDemo !== '#' && (
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn primary-action"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn secondary-action"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
