import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaWifi, FaTv, FaCoffee, FaSnowflake, FaWineGlassAlt, FaUser } from 'react-icons/fa';
import { StarRating } from '../components/StarRating';
import rooms from '../data/rooms';
import { reviews } from '../data/reviews';
import BookingForm from '../components/BookingForm';

const amenityIcons = {
  WiFi: <FaWifi />,
  TV: <FaTv />,
  Breakfast: <FaCoffee />,
  AC: <FaSnowflake />,
  "Mini Bar": <FaWineGlassAlt />,
};

const RoomDetail = () => {
  const { id } = useParams();
  const room = rooms.find(r => r.id === id);
  const roomReviews = reviews.filter(review => review.roomId === id);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!room) {
    return <div className="container mx-auto px-4 py-8">Room not found</div>;
  }

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    setShowBookingForm(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your review!');
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Room Images */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {room.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${room.name} - Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Room Info */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{room.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={room.rating} readonly />
              <span className="text-gray-600">({roomReviews.length} reviews)</span>
            </div>
            <p className="text-gray-600">{room.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-gray-600">
                  {amenityIcons[amenity]}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <button
                onClick={() => setShowReviewForm(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Write a Review
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <StarRating
                    rating={newReview.rating}
                    setRating={(rating) => setNewReview({ ...newReview, rating })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {roomReviews.map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUser className="text-gray-400" />
                    <span className="font-medium">{review.userName}</span>
                  </div>
                  <div className="mb-2">
                    <StarRating rating={review.rating} readonly />
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  {review.image && (
                    <img
                      src={review.image}
                      alt="Review"
                      className="mt-2 w-24 h-24 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-4">
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-800">${room.price}</span>
            <span className="text-gray-600">/night</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in / Check-out
              </label>
              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  selected={checkIn}
                  onChange={date => setCheckIn(date)}
                  placeholderText="Check-in"
                  className="w-full p-2 border rounded-lg"
                  minDate={new Date()}
                />
                <DatePicker
                  selected={checkOut}
                  onChange={date => setCheckOut(date)}
                  placeholderText="Check-out"
                  className="w-full p-2 border rounded-lg"
                  minDate={checkIn || new Date()}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                {[...Array(room.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Guest{i > 0 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          room={room} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </div>
  );
};

export default RoomDetail; 