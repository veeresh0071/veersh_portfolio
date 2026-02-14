import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Experience.css';

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    damping: 20,
    stiffness: 200
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    damping: 20,
    stiffness: 200
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="experience-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        className="experience-content"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="experience-glow"></div>
        
        <div className="experience-number">
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="experience-header">
          <div className="experience-title-section">
            <h3 className="experience-role">{experience.role}</h3>
            <div className="experience-company-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <p className="experience-company">{experience.company}</p>
            </div>
          </div>
          <div className="experience-meta">
            <span className="experience-duration">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {experience.duration}
            </span>
            <span className="experience-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {experience.location}
            </span>
          </div>
        </div>

        <motion.div 
          className="experience-highlights-wrapper"
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '120px' }}
        >
          <ul className="experience-highlights">
            {experience.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                {highlight}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {experience.highlights.length > 2 && (
          <button 
            className="experience-expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        )}

        {experience.technologies && (
          <div className="experience-tech">
            {experience.technologies.map((tech, idx) => (
              <motion.span 
                key={idx} 
                className="tech-tag"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "AI Engineering Intern",
      company: "WizzyBox Pvt Ltd",
      duration: "Jan 2026 - Present",
      location: "In-Office",
      highlights: [
        "Developing and deploying AI-powered solutions using machine learning and deep learning frameworks",
        "Building intelligent systems and automation tools to enhance business processes",
        "Working with natural language processing (NLP) and computer vision applications",
        "Collaborating with cross-functional teams to integrate AI models into production environments",
        "Optimizing model performance and implementing best practices for AI/ML workflows"
      ],
      technologies: ["Python", "AI", "Generative AI", "ML/DL", "NLP"]
    },
    {
      role: "Data Science Job Simulation Virtual Internship",
      company: "BCG X Company",
      duration: "March 2025",
      location: "Remote",
      highlights: [
        "Completed customer churn analysis simulation for XYZ Analytics, demonstrating advanced data analytics skills",
        "Conducted efficient data analysis using Python, Pandas, and NumPy for data visualization and interpretation",
        "Completed engineering task using random forest model, achieving 85% accuracy with concise executive summary for Associate Director"
      ],
      technologies: ["Python", "Pandas", "NumPy", "Random Forest", "Data Visualization"]
    },
    {
      role: "Data Analytics Intern",
      company: "Labmentix",
      duration: "Oct 2025 - Mar 2026",
      location: "Remote",
      highlights: [
        "Collected, cleaned, and analyzed large datasets using Python (Pandas, NumPy) and SQL to generate actionable business insights",
        "Developed interactive dashboards and visual reports in Power BI / Tableau, improving data accessibility and decision-making",
        "Performed exploratory data analysis (EDA) to identify patterns, trends, and anomalies in key performance metrics",
        "Presented analytical findings to senior analysts and stakeholders through presentations and reports",
        "Created predictive models using machine learning (regression, time series) to predict sales, demand, or performance trends"
      ],
      technologies: ["Python", "SQL", "Power BI", "Tableau", "Machine Learning", "EDA"]
    },
    {
      role: "MERN Full Stack Development Intern",
      company: "UPTOSKILLS",
      duration: "Nov 2024 - Feb 2026",
      location: "Remote",
      highlights: [
        "Built end-to-end web applications using MongoDB, Express.js, React.js, and Node.js",
        "Integrated frontend and backend components for smooth data communication",
        "Implemented secure user authentication, authorization, and access control layers",
        "Developed dashboards, forms, and data management modules",
        "Worked with Git and GitHub for version control, branching, and collaborative development"
      ],
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Git", "GitHub"]
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="experience-ambient">
        <div className="ambient-gradient"></div>
        <div className="ambient-grain"></div>
      </div>

      <div className="experience-container">
        <motion.div
          className="experience-header-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="experience-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            PROFESSIONAL JOURNEY
          </motion.div>
          
          <h2 className="experience-title">EXPERIENCE</h2>
          
          <p className="experience-subtitle">
            Building expertise through hands-on internships in data science, full-stack development, and cloud architecture
          </p>
        </motion.div>

        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
