import { useState } from 'react';
import { FaCalendarAlt, FaUser, FaDollarSign, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const MyBookings = () => {
  const [userBookings, setUserBookings] = useState([
    {
      id: 1,
      roomName: 'Deluxe Ocean View Suite',
      customerName: 'John Doe',
      checkIn: '2024-04-01',
      checkOut: '2024-04-05',
      totalPrice: 1200,
      status: 'confirmed',
      guests: 2
    },
    // Add more mock bookings as needed
  ]);

  const handleCancelBooking = (bookingId) => {
    setUserBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle />;
      case 'cancelled':
        return <FaTimesCircle />;
      default:
        return <FaClock />;
    }
  };

  return (
    <div className="page animate-fade-in">
      <div className="page__header">
        <h1>My Bookings</h1>
        <p>View and manage your hotel room bookings</p>
      </div>

      <div className="page__content">
        {userBookings.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
            <a href="/rooms" className="btn btn--primary">Browse Rooms</a>
          </div>
        ) : (
          <div className="bookings-list">
            {userBookings.map(booking => (
              <div
                key={booking.id}
                className={`card card--booking status--${booking.status} animate-slide-up`}
              >
                <div className="card__content">
                  <div className="card__title">{booking.roomName}</div>
                  
                  <div className="booking-details">
                    <div className="detail">
                      <div className="label">
                        <FaUser /> Guest
                      </div>
                      <div className="value">{booking.customerName}</div>
                    </div>
                    
                    <div className="detail">
                      <div className="label">
                        <FaCalendarAlt /> Check In
                      </div>
                      <div className="value">{booking.checkIn}</div>
                    </div>
                    
                    <div className="detail">
                      <div className="label">
                        <FaCalendarAlt /> Check Out
                      </div>
                      <div className="value">{booking.checkOut}</div>
                    </div>
                    
                    <div className="detail">
                      <div className="label">
                        <FaDollarSign /> Total Price
                      </div>
                      <div className="value">${booking.totalPrice}</div>
                    </div>
                  </div>

                  <div className="card__footer">
                    <div className={`status-badge status-badge--${booking.status}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                    
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="btn btn--danger btn--sm"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;