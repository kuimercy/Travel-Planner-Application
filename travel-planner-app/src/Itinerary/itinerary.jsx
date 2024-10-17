import  { useState, useEffect } from 'react';

const Itinerary = ({ bookingDetails }) => {
  const [destinations, setDestinations] = useState(() => {
    // Load destinations from localStorage
    const savedDestinations = localStorage.getItem('destinations');
    return savedDestinations ? JSON.parse(savedDestinations) : [];
  });
  const [destination, setDestination] = useState('');

  const handleAddDestination = () => {
    if (destination && !destinations.includes(destination)) {
      const updatedDestinations = [...destinations, destination];
      setDestinations(updatedDestinations);
      setDestination('');
      // Save to localStorage
      localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    }
  };

  const handleRemoveDestination = (index) => {
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
    // Update localStorage
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
  };

  return (
    <div className="itinerary-section p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your Itinerary</h2>

      {bookingDetails ? (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Booking Details</h3>
          <p><strong>Destination:</strong> {bookingDetails.destination}</p>
          <p><strong>Travel Date:</strong> {bookingDetails.date}</p>
          <p><strong>Guests:</strong> {bookingDetails.guests}</p>
        </div>
      ) : (
        <p className="text-center text-gray-600">No booking details available.</p>
      )}

      {/* Add Destination Section */}
      <div className="add-destination my-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Add More Destinations</h3>
        <input 
          type="text" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          placeholder="Enter destination" 
          className="p-2 rounded bg-gray-200" 
        />
        <button 
          onClick={handleAddDestination} 
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add
        </button>
      </div>

      {/* Destinations List */}
      <div className="destinations-list">
        <h3 className="text-xl font-semibold mb-2">Your Destinations</h3>
        {destinations.length > 0 ? (
          <ul className="list-disc list-inside">
            {destinations.map((dest, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{dest}</span>
                <button 
                  onClick={() => handleRemoveDestination(index)} 
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No additional destinations added.</p>
        )}
      </div>
    </div>
  );
};

export default Itinerary;

