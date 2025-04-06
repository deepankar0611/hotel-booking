import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearch, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWifi, FaSpa, FaSwimmingPool, FaConciergeBell, FaUtensils, FaGlassMartini } from 'react-icons/fa'
import RoomCard from '../components/RoomCard'
import ImageSlider from '../components/ImageSlider'
import rooms from '../data/rooms'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null })
  const [guests, setGuests] = useState(1)
  const [filteredRooms, setFilteredRooms] = useState(rooms)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All')

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  // Hero section background image
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), 
                     url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')`
  };

  // About section image
  const palaceImage = "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    const applyFilters = () => {
      return rooms.filter(room => {
        const matchesSearch = searchTerm === '' || 
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = selectedLocation === '' || 
          room.location === selectedLocation;
        
        const matchesCategory = selectedFilter === 'All' || 
          room.category === selectedFilter;

        return matchesSearch && matchesLocation && matchesCategory;
      });
    };

    const filtered = applyFilters();
    setFilteredRooms(filtered);
  }, [searchTerm, selectedLocation, selectedFilter]);

  const locations = [...new Set(rooms.map(room => room.location))]

  const features = [
    {
      icon: <FaSpa />,
      title: 'Luxury Spa',
      description: 'Indulge in our world-class spa treatments for ultimate relaxation and rejuvenation.'
    },
    {
      icon: <FaSwimmingPool />,
      title: 'Infinity Pool',
      description: 'Enjoy our stunning infinity pool with panoramic views of the surrounding landscape.'
    },
    {
      icon: <FaUtensils />,
      title: 'Fine Dining',
      description: 'Savor exquisite cuisine at our multiple award-winning restaurants.'
    },
    {
      icon: <FaConciergeBell />,
      title: '24/7 Service',
      description: 'Our dedicated staff is available round the clock to cater to your every need.'
    },
    {
      icon: <FaWifi />,
      title: 'High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet throughout the property.'
    },
    {
      icon: <FaGlassMartini />,
      title: 'Rooftop Bar',
      description: 'Experience breathtaking sunsets at our sophisticated rooftop lounge.'
    }
  ];

  return (
    <div className="home">
      <section className="home__hero" style={heroStyle}>
        <div className="home__hero-content">
          <h1>Welcome to Sargawan Palace</h1>
          <p>Experience unparalleled luxury in the heart of nature. Where traditional elegance meets modern comfort.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Book Your Stay
          </motion.button>
        </div>
      </section>

      <section className="home__about">
        <div className="home__about-container">
          <div className="home__about-content">
            <h2>A Legacy of Luxury</h2>
            <p>
              Nestled in the serene landscapes of Sargawan, our palace hotel stands as a testament to royal heritage and modern luxury. 
              Built in the grand architectural style of the region, every corner of our establishment tells a story of rich history and timeless elegance.
            </p>
            <p>
              With over 50 meticulously designed rooms and suites, each space is a perfect blend of traditional artistry and contemporary comfort. 
              Our commitment to excellence is reflected in every detail, from hand-crafted furnishings to state-of-the-art amenities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Discover Our Story
            </motion.button>
          </div>
          <div className="home__about-image">
            <img src={palaceImage} alt="Sargawan Palace Exterior" />
          </div>
        </div>
      </section>

      <section className="home__features">
        <div className="home__features-container">
          <div className="home__features-header">
            <h2>Experience Luxury</h2>
            <p>Discover the exceptional amenities and services that make Sargawan Palace a destination like no other.</p>
          </div>
          <div className="home__features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="home__features-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__rooms">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-secondary text-4xl mb-4">Our Accommodations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of luxurious rooms and suites, each designed to provide an unforgettable stay.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            {['All', 'Luxury', 'Standard', 'Budget'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all
                  ${selectedFilter === filter
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="home__testimonials">
        <div className="home__testimonials-container">
          <div className="home__testimonials-header">
            <h2>Guest Experiences</h2>
          </div>
          {/* Add testimonials slider here */}
        </div>
      </section>
    </div>
  )
}

export default Home 