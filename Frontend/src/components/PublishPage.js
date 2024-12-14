import React, { useState } from 'react';
import Slider from 'react-slick'; // Import react-slick
import './PublishPage.css';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css';
import background from '../assets/background.png';

const PublishPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]); // To store the images from the backend
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage('Please fill in both the title and description.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/generate_comic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title,
          scenario: description,
          style: "Epic, dramatic, vibrant, detailed, contrasting, traditional, dynamic, emotional, mythological, intense.",
          template: "Your template here...",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Comic generated successfully!`);
        setImages(data.images_links || []); // Assuming backend sends images in `images_links`
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || 'Failed to generate comic.'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Carousel settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="publishpage-container">
      <header className="publishpage-header" style={{ backgroundImage: `url(${background})` }}>
        <div className="publishpage-logo">Comic Gen</div>
        <div className="publishpage-input-section">
          <label htmlFor="title" className="publishpage-input-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Give a Title to your comic"
            className="publishpage-input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <label htmlFor="description" className="publishpage-input-label">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Give a brief description of your comic"
            className="publishpage-input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
          <button
            id="submit"
            className="publishpage-publish-button"
            onClick={handlePublish} 
            disabled={loading} 
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="publishpage-content">
        <div className="publishpage-output-section">
          {message && <p className="publishpage-message">{message}</p>}
          {images.length > 0 && (
            <div className="publishpage-carousel">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <img src={image} alt={`Comic Panel ${index + 1}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
