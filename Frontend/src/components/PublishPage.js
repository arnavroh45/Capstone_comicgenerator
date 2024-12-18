import React, { useState } from 'react';
import Slider from 'react-slick'; // Import react-slick
import './PublishPage.css';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css';
import background from '../assets/background.png';
import ImageCarousel from './ImageCar';

const PublishPage = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]); // To store the images from the backend
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!title || !description || !genre) {
      setMessage('Please fill in the title, description, and genre.');
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
          genre,
          language,
          scenario: description,
          style:
            'Epic, dramatic, vibrant, detailed, contrasting, traditional, dynamic, emotional, mythological, intense.',
          template: `You are a cartoon creator. You will be given a short scenario, you must split it in multiple parts. Try to make it as much detailed as possible. Each part will be a different cartoon panel. For each cartoon panel, you will write a description of it with: 
- the characters in the panel, they must be described precisely each time 
- the background of the panel.

The description should be only word or group of word delimited by a comma, no sentence. Always use the characters descriptions instead of their name in the cartoon panel description. Make sure to describe the characters appropriately in the description.

You will also write the text of the panel. The text should not be more than 2 small sentences. Each sentence should start by the character name.

Example input:
Characters: Adrien is a guy with blond hair wearing glasses. Vincent is a guy with black hair wearing a hat. Adrien and vincent want to start a new product, and they create it in one night before presenting it to the board.

Strictly stick to the format as mentioned in the example provided,

Example output:
# Panel 1
description: 2 guys, a blond hair guy wearing glasses, a dark hair guy wearing hat, sitting at the office, with computers
text: Vincent: I think Generative AI are the future of the company.
Adrien: Let's create a new product with it.

# end 

Short Scenario: {scenario}
Split the scenario in multiple parts:`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.image_links);
        setMessage('Comic generated successfully!');
        setImages(data.image_links || []);
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
const images1 = [
  "http://res.cloudinary.com/dfntvlmqc/image/upload/v1734541422/Arnavasharma4_be21%40thapar.edu_comic/monkey%20eating%20bananas/panel_1.png",
  "http://res.cloudinary.com/dfntvlmqc/image/upload/v1734541486/Arnavasharma4_be21%40thapar.edu_comic/monkey%20eating%20bananas/panel_2.png",
  "http://res.cloudinary.com/dfntvlmqc/image/upload/v1734541518/Arnavasharma4_be21%40thapar.edu_comic/monkey%20eating%20bananas/panel_3.png",
  "http://res.cloudinary.com/dfntvlmqc/image/upload/v1734541538/Arnavasharma4_be21%40thapar.edu_comic/monkey%20eating%20bananas/panel_4.png"
]
  // Carousel settings for react-slick
  const settings = {
    dots: true,
    infinite: false, // Changed from true to false
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, // Helps with varying image sizes
    arrows: true, // Add navigation arrows
    centerMode: false, // Ensure full image display
    accessibility: true, // Improve keyboard navigation
    draggable: true, // Allow mouse/touch dragging
    swipeToSlide: true, // Enable swiping
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          dots: true,
          arrows: false // Hide arrows on smaller screens
        }
      }
    ]
  };

  return (
    <div className="publishpage-container">
      <header
        className="publishpage-header"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="publishpage-logo">Comic Gen</div>

        {/* Form Container */}
        <div className="publishpage-form-container">
          {/* Input Section */}
          <div className="publishpage-input-section">
            {/* Title Input */}
            <div className="publishpage-input-group">
              <label htmlFor="title" className="publishpage-input-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Give a Title to your comic"
                className="publishpage-input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Dropdown for Genre */}
            <div className="publishpage-input-group">
              <label htmlFor="genre" className="publishpage-input-label">
                Select a genre:
              </label>
              <select
                id="genre"
                className="publishpage-input-field"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="" disabled>
                  -- Select a genre --
                </option>
                <option value="Fantasy">Fantasy</option>
                <option value="Adventure">Adventure</option>
                <option value="Romance">Romance</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Mystery">Mystery</option>
              </select>
            </div>
            <div className="publishpage-input-group">
              <label htmlFor="translation" className="publishpage-input-label">
                Select a language:
              </label>
              <select
                id="translation"
                className="publishpage-input-field"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Arabic">Arabic</option>
                <option value="Russian">Russian</option>
                <option value="Italian">Italian</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Urdu">Urdu</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Marathi">Marathi</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Thai">Thai</option>
                <option value="Greek">Greek</option>
                <option value="Dutch">Dutch</option>
                <option value="Polish">Polish</option>
                <option value="Turkish">Turkish</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Farsi">Farsi</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Swahili">Swahili</option>
              </select>
            </div>
          </div>

          {/* Description Input */}
          <div className="publishpage-description">
            <label htmlFor="description" className="publishpage-input-label">
              Description:
            </label>
            <textarea
              id="description"
              placeholder="Give a brief description of your comic"
              className="publishpage-description-field"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Publish Button */}
          <button
            className="publishpage-publish-button"
            onClick={handlePublish}
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>


      {/* Output Section */}
      <div className="publishpage-content">
        <div className="publishpage-output-section">
          <div className="publishpage-output-placeholder">

            {images.length > 0 ? (
               <ImageCarousel images={images} />
              // <Slider {...settings}>
              //   {images1.map((image, index) => (
              //     <div key={index} className="carousel-slide">
              //       <img
              //         src={image}
              //         alt={`Comic Panel ${index + 1}`}
              //         className="carousel-image"
              //         style={{ 
              //           maxWidth: '100%', 
              //           maxHeight: '500px', 
              //         }}
              //       />
              //     </div>
              //   ))}
              // </Slider>
            ) : (
              <p className="placeholder-text">Your comic panels will appear here.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default PublishPage;
