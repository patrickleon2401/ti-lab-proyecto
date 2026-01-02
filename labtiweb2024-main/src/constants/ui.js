/**
 * Common configuration objects used throughout the application
 * Maintains consistency for repeated UI patterns
 */

/**
 * Default React Slick settings for image carousels
 */
export const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

/**
 * Common grid layout for card displays
 * 3-column responsive grid layout
 */
export const GRID_LAYOUT = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  marginTop: '10px',
};

/**
 * Common card styling for consistent look
 */
export const CARD_STYLES = {
  backgroundColor: '#f4f4f4',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  boxSizing: 'border-box',
  height: 'auto',
};

/**
 * Image placeholder styling
 */
export const IMAGE_PLACEHOLDER_STYLES = {
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  borderRadius: '8px',
  position: 'relative',
};

/**
 * Full image styling
 */
export const IMAGE_STYLES = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};