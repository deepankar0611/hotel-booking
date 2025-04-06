import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBed, FaBath, FaWifi, FaCoffee, FaParking, FaRulerCombined, FaUsers, FaStar } from 'react-icons/fa';

const RoomCard = ({ room }) => {
  const [isLoading, setIsLoading] = useState(true);

  const features = [
    { icon: <FaBed />, text: `${room.beds} ${room.beds > 1 ? 'Beds' : 'Bed'}` },
    { icon: <FaBath />, text: `${room.bathrooms} ${room.bathrooms > 1 ? 'Baths' : 'Bath'}` },
    { icon: <FaRulerCombined />, text: room.size },
    { icon: <FaUsers />, text: `${room.maxGuests} Guests` },
  ];

  const amenities = room.amenities?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="room-card"
    >
      <div className="room-card__image-container">
        <img
          src={room.image}
          alt={room.name}
          className="room-card__image"
          onLoad={() => setIsLoading(false)}
        />
        <div className="rating-badge">
          <FaStar />
          <span>{room.rating}</span>
        </div>
        <div className="category-badge">
          {room.category}
        </div>
      </div>
      
      <div className="room-card__content">
        <h3 className="room-card__title">{room.name}</h3>
        
        <div className="room-card__location">
          <FaMapMarkerAlt />
          <span>{room.location}</span>
        </div>
        
        <div className="room-card__features">
          {features.map((feature, index) => (
            <div key={index} className="room-card__features-item">
              {feature.icon}
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="room-card__price">
          ${room.price} <span>/ night</span>
        </div>
        
        <Link to={`/room/${room.id}`} className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="room-card__button"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard; 