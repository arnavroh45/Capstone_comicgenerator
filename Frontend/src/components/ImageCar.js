import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image loaded state when images change
  useEffect(() => {
    setImageLoaded(false);
  }, [images]);

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Dot navigation handler
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Render nothing if no images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        {/* Main Image Display */}
        <div className="carousel-image-wrapper">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="image-container">
                <img 
                  src={image} 
                  alt={`Comic Panel ${index + 1}`} 
                  className="carousel-image"
                  onLoad={handleImageLoad}
                  style={{ 
                    visibility: imageLoaded ? 'visible' : 'hidden',
                    opacity: imageLoaded ? 1 : 0
                  }}
                />
                {!imageLoaded && (
                  <div className="image-loader">
                    <div className="spinner"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button 
              className="carousel-nav-button prev" 
              onClick={handlePrev}
              aria-label="Previous Image"
            >
              &#10094;
            </button>
            <button 
              className="carousel-nav-button next" 
              onClick={handleNext}
              aria-label="Next Image"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Dot Navigation */}
        {images.length > 1 && (
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;