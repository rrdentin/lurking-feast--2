const BASE_URL = 'https://restaurant-api.dicoding.dev';
const CLIENT_SECRET = ''; // Add your secret if required

const API_ENDPOINT = {
  GET_RESTO_LIST: () => `${BASE_URL}/list`,
  GET_RESTO_BY_ID: (id) => `${BASE_URL}/detail/${id}`,
  SEARCH_RESTO: (query) => `${BASE_URL}/search?q=${query}`,
  ADD_REVIEW: () => `${BASE_URL}/review`,
  GET_IMAGE: (size, pictureId) => `${BASE_URL}/images/${size}/${pictureId}`, // For images
};

export const RestoRestAPI = {
  /**
   * Get the list of all restaurants.
   * @returns {Promise<Object>} - The list of restaurants as a JSON object.
   */
  getRestoList: async () => {
    try {
      const response = await fetch(API_ENDPOINT.GET_RESTO_LIST(), {
        headers: {
          Authorization: CLIENT_SECRET ? `Bearer ${CLIENT_SECRET}` : undefined,
        },
      });
      if (!response.ok) throw new Error(`Error fetching restaurant list: ${response.statusText}`);
      const data = await response.json();
      return data.restaurants; // Access the correct property
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * Get the details of a specific restaurant by ID.
   * @param {string} restoId - The ID of the restaurant.
   * @returns {Promise<Object>} - The restaurant details as a JSON object.
   */
  getRestoById: async (id) => {
    try {
      const response = await fetch(API_ENDPOINT.GET_RESTO_BY_ID(id), {
        headers: {
          Authorization: CLIENT_SECRET ? `Bearer ${CLIENT_SECRET}` : undefined,
        },
      });
      if (!response.ok) throw new Error(`Error fetching restaurant details: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching restaurant with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search for restaurants by name, category, or menu.
   * @param {string} query - The search query.
   * @returns {Promise<Object>} - The search results as a JSON object.
   */
  searchResto: async (query) => {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH_RESTO(query), {
        headers: {
          Authorization: CLIENT_SECRET ? `Bearer ${CLIENT_SECRET}` : undefined,
        },
      });
      if (!response.ok) throw new Error(`Error searching restaurants: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * Add a review for a restaurant.
   * @param {Object} reviewData - The review data containing id, name, and review.
   * @returns {Promise<Object>} - The response containing updated reviews.
   */
  addReview: async (reviewData) => {
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: CLIENT_SECRET ? `Bearer ${CLIENT_SECRET}` : undefined,
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error(`Error adding review: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * Get the URL of a restaurant image.
   * @param {string} pictureId - The ID of the image.
   * @param {'small'|'medium'|'large'} size - The desired image size.
   * @returns {string} - The URL of the restaurant image.
   */
  getImageUrl: (pictureId, size = 'medium') => {
    if (!['small', 'medium', 'large'].includes(size)) {
      throw new Error('Invalid image size. Use "small", "medium", or "large".');
    }
    return API_ENDPOINT.GET_IMAGE(size, pictureId);
  },
};
