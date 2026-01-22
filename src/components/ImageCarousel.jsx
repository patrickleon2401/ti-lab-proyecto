import React from 'react';
import Slider from 'react-slick';
import { SLIDER_SETTINGS } from '../constants/ui.js';

/**
 * Image carousel component using react-slick
 * Provides consistent carousel behavior
 * @param {Object} props
 * @param {React.ReactNode[]} props.children - Slide elements to render
 * @param {Object} props.settings - Custom slider settings (optional)
 */
const ImageCarousel = ({ children, settings = SLIDER_SETTINGS }) => {
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};

export default ImageCarousel;