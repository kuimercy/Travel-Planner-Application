

import  { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"; 
import Itinerary from "../Itinerary/Itinerary"; 
import { fetchDestinations } from "../Service/apiService"; 

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [popularDestinations] = useState([
    {
      name: "Mauritius",
      image:
        "https://media.easemytrip.com/media/Blog/International/638241487495525450/638241487495525450vo8sQ8.png",
      description: "Breathtaking beaches offering relaxation and water sports.",
    },
    {
      name: "South Africa",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSs9QspYZCBSK5vw1f_pQ4MmPzv44PUuuGVg&s",
      description:
        "Majestic wildlife, scenic beauty and rich cultural heritage.",
    },
    {
      name: "Dubai",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipMazuVsL0HX51aw0NeR8L6Oq7zWkDSnpa4Fpb53=w1080-h624-n-k-no",
      description:
        "Skyscrapers and high-rise buildings, in particular the world's tallest building, the Burj Khalifa.",
    },
    {
      name: "Zanzibar",
      image:
        "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTjj2tAgx40lyXJgr5KxhufeRYh4AT5oztJnTZ0Yc8oBGHknv3ZubIJdx0fqbI7fFikcJQZnZ58tNHy_MHKckKoNlHlYTBLMPJ8WKv_gA",
      description:
        "Shining white-sand beaches with palms swaying lazily in the sea breeze.",
    },
  ]);

  // State to hold booking details
  const [bookingDetails, setBookingDetails] = useState(null);

  // State to handle loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) {
      setDestinations([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await fetchDestinations(query);
      setDestinations(results);
    } catch (err) {
      setError("Failed to fetch destinations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const destination = event.target.destination.value;
    const date = event.target.date.value;
    const guests = event.target.guests.value;

    // Update the booking details state
    setBookingDetails({ destination, date, guests });

    // Optionally clear the form fields or handle further logic
    event.target.reset();
  };

  return (
    <div>
      
<nav className="bg-gray-800 p-4">
  <div className="container mx-auto flex justify-between">
    <a
      href="#top"
      className="font-bold text-lg"
      onClick={() => window.scrollTo(0, 0)}
    >
      Safari Connect Travels
    </a>
    <div className="flex space-x-4">
      <a href="#homepage" className="hover:underline">
        Home
      </a>
      <a href="#contact-section" className="hover:underline">
        Contact Us
      </a>
      <a href="#book-with-us" className="hover:underline">
        Book Your Trip Now
      </a>
      <a
        href="#itinerary-section"
        className="hover:underline"
        onClick={(e) => {
          if (!bookingDetails) {
            e.preventDefault(); // Prevent navigation
            alert(
              "You can proceed to the itinerary, but please note that you have no bookings yet."
            );
          }
        }}
      >
        Itinerary
      </a>
    </div>
  </div>
</nav>


      {/* Homepage Section */}
      <section
        id="homepage"
        className="homepage-container relative min-h-screen flex flex-col justify-center text-white p-8 bg-[url('https://i.natgeofe.com/k/e7ba8001-23ac-457f-aedb-abd5f2fdda62/moms5_4x3.png')] bg-cover bg-center"
      >
        <div className="overlay bg-black opacity-50 absolute inset-0 z-0"></div>
        <div className="content-container z-10 text-center p-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to Safari Connect Travels
          </h1>
          <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
            Discover destinations and plan your perfect trip with us!
          </p>
          <div className="mt-6">
            <a
              href="#explore"
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md"
            >
              Start Exploring
            </a>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="explore-page p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Explore Destinations
        </h1>
        {/* SearchBar */}
        <div className="mb-6 text-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {isLoading && (
          <p className="text-center text-gray-600">Loading destinations...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.length > 0 ? (
            destinations.map((destination, index) => (
              <div
                key={index}
                className="destination-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {destination.name}
                </h3>
                <p className="text-gray-600">{destination.description}</p>
                <Link
                  to={`/destinations/${destination.name}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            !isLoading && (
              <p className="text-gray-600 text-center">
                No destinations found. Try searching for a destination.
              </p>
            )
          )}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section id="destinations" className="p-8">
        <h2 className="text-4xl font-bold text-center mb-6">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination, index) => (
            <div
              key={index}
              className="destination-card bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{destination.name}</h3>
                <p className="text-gray-600">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section
        id="booking"
        className="booking-section p-8 bg-gray-800 text-white"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Book Your Trip Now!
        </h1>
        <form
          onSubmit={handleBooking}
          className="max-w-xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-sm font-bold mb-2"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="w-full p-2 rounded bg-gray-600 text-white"
              placeholder="Enter your destination"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-bold mb-2">
              Travel Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full p-2 rounded bg-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="returnDate"
              className="block text-sm font-bold mb-2"
            >
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              className="w-full p-2 rounded bg-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-sm font-bold mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              className="w-full p-2 rounded bg-gray-600 text-white"
              placeholder="Enter number of guests"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded transition duration-300 shadow-md"
          >
            Book Now
          </button>
        </form>
      </section>

      {/* Display Itinerary if a booking is made */}
      {bookingDetails && <Itinerary bookingDetails={bookingDetails} />}
      
      {/* Contact Us Section */}
      <section className="contact-section p-8 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">For inquiries, reach out to us:</p>
          <a
            href="mailto:safariconnecttravelsinfo@gmail.com"
            className="text-blue-600 hover:underline mb-2"
          >
            Email: safariconnecttravelsinfo@gmail.com
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            WhatsApp: +254 701 430157
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Safari Connect Travels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

