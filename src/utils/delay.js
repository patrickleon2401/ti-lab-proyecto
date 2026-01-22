/**
 * Helper function to simulate API delay
 * Used in mock data responses to mimic real API behavior
 * @param {number} ms - Milliseconds to delay (default: 800)
 * @returns {Promise} Promise that resolves after delay
 */
export const delay = (ms = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};