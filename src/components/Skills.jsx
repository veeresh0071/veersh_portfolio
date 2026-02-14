import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const skillCategories = [
    {
      title: 'Data Analytics & Visualization',
      skills: [
        { 
          name: 'Python', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        },
        { 
          name: 'SQL', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        },
        { 
          name: 'MS Excel', 
          icon: 'https://img.icons8.com/color/96/microsoft-excel-2019--v1.png',
        },
        { 
          name: 'Pandas', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
        },
        { 
          name: 'NumPy', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
        },
        { 
          name: 'Power BI', 
          icon: 'https://img.icons8.com/color/96/power-bi.png',
        },
        { 
          name: 'Tableau', 
          icon: 'https://img.icons8.com/color/96/tableau-software.png',
        },
        { 
          name: 'Data Analysis', 
          icon: 'https://img.icons8.com/fluency/96/data-configuration.png',
        }
      ]
    },
    {
      title: 'AI & Machine Learning',
      skills: [
        { 
          name: 'Machine Learning', 
          icon: 'https://img.icons8.com/color/96/artificial-intelligence.png',
        },
        { 
          name: 'Deep Learning', 
          icon: 'https://img.icons8.com/fluency/96/deep-learning.png',
        },
        { 
          name: 'TensorFlow', 
          icon: 'https://img.icons8.com/color/96/tensorflow.png',
        },
        { 
          name: 'PyTorch', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
        },
        { 
          name: 'Scikit-Learn', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
        },
        { 
          name: 'Keras', 
          icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg',
        }
      ]
    },
    {
      title: 'Full Stack Development',
      skills: [
        { 
          name: 'React.js', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        { 
          name: 'Node.js', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        { 
          name: 'Express.js', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        },
        { 
          name: 'MongoDB', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        },
        { 
          name: 'JavaScript', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        { 
          name: 'HTML5', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        },
        { 
          name: 'CSS3', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        },
        { 
          name: 'Flask', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
        }
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { 
          name: 'Git', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        },
        { 
          name: 'GitHub', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        },
        { 
          name: 'VS Code', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        },
        { 
          name: 'Jupyter', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
        },
        { 
          name: 'AWS', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        }
       
      ]
    }
  ];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseXPos = e.clientX - centerX;
    const mouseYPos = e.clientY - centerY;
    const xPct = mouseXPos / (rect.width / 2);
    const yPct = mouseYPos / (rect.height / 2);
    mouseX.set(xPct * 0.3);
    mouseY.set(yPct * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [skillCategories.length]);

  return (
    <section id="skills" className="skills-premium" ref={containerRef}>
      <div className="skills-grain"></div>
      
      <div className="skills-content-wrapper">
        <div className="skills-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="skills-heading">SKILLS</h2>
            <p className="skills-subtitle">
              Technologies I use to build scalable, production-ready applications.
            </p>
          </motion.div>
        </div>

        <div className="skills-right">
          <div
            className="cards-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="cards-3d-wrapper"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
            >
              {skillCategories.map((category, index) => {
                const isActive = index === activeCard;
                const offset = index - activeCard;
                
                return (
                  <motion.div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`skill-card-premium ${isActive ? 'active' : ''}`}
                    style={{
                      zIndex: isActive ? 10 : 3 - Math.abs(offset),
                      transformStyle: "preserve-3d"
                    }}
                    animate={{
                      translateZ: isActive ? 80 : -Math.abs(offset) * 60,
                      translateY: isActive ? -15 : -Math.abs(offset) * 25,
                      rotateZ: isActive ? 0 : offset * 2,
                      scale: isActive ? 1 : 0.95 - Math.abs(offset) * 0.05,
                      filter: isActive ? "blur(0px)" : `blur(${Math.abs(offset) * 2}px)`,
                      opacity: isActive ? 1 : 0.4 - Math.abs(offset) * 0.1
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    whileHover={isActive ? {
                      translateZ: 100,
                      translateY: -25,
                      scale: 1.03,
                      transition: { duration: 0.3 }
                    } : {}}
                  >
                    <motion.div
                      className="card-floating"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                    >
                      <h3 className="card-title">{category.title}</h3>
                      
                      <div className="skills-grid-premium">
                        {category.skills.map((skill, skillIdx) => (
                          <motion.div
                            key={skillIdx}
                            className="skill-item-premium"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIdx * 0.05, duration: 0.5 }}
                            onMouseEnter={() => setHoveredSkill(`${index}-${skillIdx}`)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            whileHover={{ scale: 1.15, y: -8 }}
                          >
                            <div className="skill-icon-wrapper">
                              <img 
                                src={skill.icon} 
                                alt={skill.name}
                                className="skill-icon-premium"
                              />
                            </div>
                            <span className="skill-name-premium">{skill.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="card-indicators">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeCard ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
                aria-label={`View ${skillCategories[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
