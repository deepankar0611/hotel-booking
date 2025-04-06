import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import rooms from '../data/rooms';

const Admin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: '',
    amenities: [],
    images: [''],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoom) {
      toast.success('Room updated successfully!');
    } else {
      toast.success('Room added successfully!');
    }
    setShowForm(false);
    setEditingRoom(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      capacity: '',
      amenities: [],
      images: [''],
    });
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      amenities: room.amenities,
      images: room.images,
    });
    setShowForm(true);
  };

  const handleDelete = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      toast.success('Room deleted successfully!');
    }
  };

  const allAmenities = [
    'WiFi',
    'TV',
    'AC',
    'Breakfast',
    'Mini Bar',
    'Ocean View',
    'Garden View',
    'Kitchen',
    'Washer',
  ];

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Luxury Suite',
      price: 200,
      capacity: 2,
      status: 'available'
    }
  ]);

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(rooms.map(room =>
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus />
          Add New Room
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity (Guests)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {allAmenities.map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, amenity],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              amenities: formData.amenities.filter(a => a !== amenity),
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URLs
                </label>
                {formData.images.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="flex-grow p-2 border rounded-lg"
                      placeholder="https://example.com/image.jpg"
                    />
                    {index === formData.images.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                        className="px-3 py-2 bg-gray-100 rounded-lg"
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="px-3 py-2 bg-gray-100 rounded-lg"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingRoom(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map(room => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{room.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${room.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{room.capacity} Guests</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    room.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleStatusChange(room.id, room.status === 'available' ? 'unavailable' : 'available')}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin; 