import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import RotatingText from './RotatingText';
import GradientText from './GradientText';
import './Hero.css';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
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
    setIsHovered(false);
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/VEERESH PUJAR.pdf';
    link.download = 'VEERESH PUJAR.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadResume2 = () => {
    const link = document.createElement('a');
    link.href = '/VEERESH  PUJAR 2.pdf';
    link.download = 'VEERESH  PUJAR 2.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const headlineWords = [];

  return (
    <section id="home" className="hero-premium">
      <motion.div 
        className="hero-grain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      />

      <div className="hero-container-premium">
        {/* Left Side - Premium Identity Card */}
        <motion.div 
          className="hero-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className="identity-card-premium"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="card-3d-wrapper"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="card-face"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src="/mine.jpg" 
                  alt="Veeresh Pujar"
                  className="card-image"
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <motion.img 
                  src="/mine.jpg" 
                  alt="Veeresh Pujar"
                  className="card-image card-image-hover"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.9
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="card-overlay" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Hero Content */}
        <div className="hero-right">
          {/* Name Introduction */}
          <motion.h1 
            className="hero-name-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Hi, I'm{' '}
            <motion.span 
              className="name-highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.5, 
                ease: [0.22, 1, 0.36, 1],
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 100
                }
              }}
            >
              VEERESH PUJAR
            </motion.span>
          </motion.h1>

          {/* Animated Headline */}
          <div className="hero-headline">
            {headlineWords.map((word, index) => (
              <motion.div
                key={index}
                className={`headline-line ${word.highlight ? 'highlight' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word.text}
              </motion.div>
            ))}
          </div>

          {/* Subtext */}
          <motion.p 
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <RotatingText
              texts={['Data Analyst', 'AI Engineer', 'MERN Full Stack Developer', 'Data Science', 'Machine Learning']}
              mainClassName="hero-rotating-text"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
            {' '}focused on building production-ready applications that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              className="cta-primary"
              onClick={scrollToProjects}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>View Projects</span>
            </motion.button>
            
            <motion.button
              className="cta-secondary"
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Resume 1</span>
            </motion.button>

            <motion.button
              className="cta-secondary"
              onClick={handleDownloadResume2}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Resume 2</span>
            </motion.button>
          </motion.div>

          {/* Micro-Proof Row with Gradient Text */}
          <motion.div 
            className="hero-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="proof-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <GradientText
                colors={["#000000", "#ffffff", "#000000"]}
                animationSpeed={3}
                showBorder={false}
                className="proof-gradient-text"
              >
                PRODUCTION-READY
              </GradientText>
            </div>
            <div className="proof-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <GradientText
                colors={["#000000", "#ffffff", "#000000"]}
                animationSpeed={3}
                showBorder={false}
                className="proof-gradient-text"
              >
                SCALABLE SYSTEMS
              </GradientText>
            </div>
            <div className="proof-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <GradientText
                colors={["#000000", "#ffffff", "#000000"]}
                animationSpeed={3}
                showBorder={false}
                className="proof-gradient-text"
              >
                CLEAN ARCHITECTURE
              </GradientText>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
