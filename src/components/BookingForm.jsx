import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function BookingForm({ room, onClose }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    specialRequests: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to a backend
    console.log('Booking submitted:', { room, ...formData })
    
    // Show success message and redirect to my bookings
    alert('Booking successful!')
    navigate('/my-bookings')
  }

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    
    // Calculate nights between check-in and check-out
    const nights = Math.ceil(
      (formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24)
    )
    
    return nights * room.price
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Complete Your Booking</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
            <p className="text-gray-600">${room.price} per night</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date
                </label>
                <DatePicker
                  selected={formData.checkIn}
                  onChange={date => setFormData(prev => ({ ...prev, checkIn: date }))}
                  className="input"
                  placeholderText="Select check-in date"
                  minDate={new Date()}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date
                </label>
                <DatePicker
                  selected={formData.checkOut}
                  onChange={date => setFormData(prev => ({ ...prev, checkOut: date }))}
                  className="input"
                  placeholderText="Select check-out date"
                  minDate={formData.checkIn || new Date()}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="input"
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="input"
                rows="3"
                placeholder="Any special requests or requirements?"
              ></textarea>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Price:</span>
                <span className="text-xl font-bold">${calculateTotalPrice()}</span>
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm 