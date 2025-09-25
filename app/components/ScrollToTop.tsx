'use client';
import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.1 }}
          onClick={scrollToTop}
          className="cursor-pointer p-4 fixed z-5 bottom-5 rounded-[2px] right-5 bg-white border-[2px] border-primary hover:bg-primary duration-100 group"
        >
          <ArrowUp className="duration-100 group-hover:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
