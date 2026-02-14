import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './About.css';

const JourneyCard = ({ index, icon, title, subtitle, description, badge, progress }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    damping: 20,
    stiffness: 200
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
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
      className="journey-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className="journey-card-inner"
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="journey-icon">{icon}</div>
        
        {badge && (
          <motion.div 
            className="journey-badge"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {badge}
          </motion.div>
        )}

        <h3 className="journey-title">{title}</h3>
        <p className="journey-subtitle">{subtitle}</p>
        <p className="journey-description">{description}</p>

        {progress && (
          <div className="journey-progress">
            <div className="progress-label">
              <span>CGPA</span>
              <span className="progress-value">{progress.value}</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  const AnimatedNumber = ({ end, duration = 2, suffix = "+" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [end, duration]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <span className="stat-number-premium">
        {count}{suffix}
      </span>
    );
  };

  const journeyData = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
      title: "Education",
      subtitle: "Govt Engineering College, Nargund",
      description: "B.E. in Artificial Intelligence and Data Science (CGPA: 7.8). Building strong fundamentals in ML, DL, and Data Analytics with hands-on project experience.",
      progress: {
        value: "7.8/10",
        percentage: 78
      }
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 7h-9M14 17H5M17 12H3"/>
          <circle cx="20" cy="17" r="2"/>
          <circle cx="20" cy="7" r="2"/>
          <circle cx="14" cy="12" r="2"/>
        </svg>
      ),
      title: "Experience",
      subtitle: "Data Science & Full-Stack Development",
      description: "Completed internships at BCG X Company (Data Science), Labmentix (Data Analytics), UPTOSKILLS (MERN Stack), and AWS (Solutions Architecture). Specialized in data analytics, ML modeling, and cloud architecture.",
      badge: null
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
      title: "Projects",
      subtitle: "AI & Full-Stack Solutions",
      description: "Built Smart Agri Vision (98% accuracy crop prediction), Plant Disease Analysis (CNN-based detection), and UptoSkilla Web Application (MERN stack with GitHub OAuth). Focus on ML/DL, data visualization, and scalable web apps.",
      badge: "BUILDING"
    }
  ];

  return (
    <section id="about" className="about-premium">
      {/* Ambient Background */}
      <div className="about-ambient">
        <div className="ambient-gradient"></div>
        <div className="ambient-grain"></div>
      </div>

      <div className="about-container-premium">
        {/* Section Title */}
        <motion.h2 
          className="about-title-premium"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          ABOUT
        </motion.h2>

        {/* Intro Text */}
        <motion.p
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          AI & Data Science student with hands-on experience in data analytics, machine learning, and full-stack development. 
          Skilled in Python, React.js, and cloud technologies with a track record of building high-accuracy ML models and scalable web applications.
        </motion.p>

        {/* Journey Timeline Cards */}
        <div className="journey-timeline">
          {journeyData.map((card, index) => (
            <JourneyCard
              key={`journey-card-${index}`}
              index={index}
              icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              badge={card.badge}
              progress={card.progress}
            />
          ))}
        </div>

        {/* Premium Glassmorphism Stats Card */}
        <motion.div 
          ref={statsRef}
          className="stats-glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stats-grid-premium">
            <div className="stat-block">
              <AnimatedNumber end={5} duration={2} suffix="+" />
              <span className="stat-label-premium">Projects Built</span>
            </div>
            
            <div className="stat-divider-premium"></div>
            
            <div className="stat-block">
              <AnimatedNumber end={4} duration={1.5} suffix="+" />
              <span className="stat-label-premium">Internships</span>
            </div>
            
            <div className="stat-divider-premium"></div>
            
            <div className="stat-block">
              <AnimatedNumber end={10} duration={2} suffix="+" />
              <span className="stat-label-premium">Technologies</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
