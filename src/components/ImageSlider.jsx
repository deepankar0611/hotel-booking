import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    title: 'Experience Luxury & Comfort',
    subtitle: 'Discover handpicked luxury hotels with breathtaking views'
  },
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop',
    title: 'Unforgettable Stays',
    subtitle: 'Create lasting memories in our world-class accommodations'
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    title: 'Luxury Redefined',
    subtitle: 'Experience the epitome of hospitality and comfort'
  }
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${images[currentIndex].url}')` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                {images[currentIndex].title}
              </h1>
              <p className="text-xl text-white mb-8 drop-shadow-md">
                {images[currentIndex].subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 