import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Dock.css';

function DockItem({ children, mouseX, magnification = 80, distance = 150 }) {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [50, magnification, 50]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="dock-item"
    >
      {children}
    </motion.div>
  );
}

export default function Dock({ items }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="dock-container">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="dock"
      >
        {items.map((item, i) => (
          <DockItem key={i} mouseX={mouseX}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-link"
              aria-label={item.label}
            >
              <div className="dock-icon-wrapper">
                {item.icon}
              </div>
              <span className="dock-tooltip">{item.label}</span>
            </a>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}
