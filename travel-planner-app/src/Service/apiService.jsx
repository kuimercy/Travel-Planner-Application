import axios from "axios";

const AMADEUS_AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const AMADEUS_LOCATION_URL = "https://test.api.amadeus.com/v1/reference-data/locations";

// Get Access Token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      AMADEUS_AUTH_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_API_KEY,
        client_secret: import.meta.env.VITE_API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// Fetch Destinations
const fetchDestinations = async (query) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      `${AMADEUS_LOCATION_URL}?subType=CITY&keyword=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};


export { getAccessToken, fetchDestinations };
