import React, { useState } from 'react';
import Slider from 'react-slick'; // Import react-slick
import './PublishPage.css';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css';
import background from '../assets/background.png';

const PublishPage = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]); // To store the images from the backend
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!title || !description || !genre) {
      setMessage('Please fill in both the title and description.');
      return;
    }

    setLoading(true);
    console.log(genre);
    
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
          scenario: description,
          style: "Epic, dramatic, vibrant, detailed, contrasting, traditional, dynamic, emotional, mythological, intense.",
          template: "You are a cartoon creator. You will be given a short scenario, you must split it in multiple parts. Try to make it as much detailed as possible.  Each part will be a different cartoon panel. For each cartoon panel, you will write a description of it with: - the characters in the panel, they must be described precisely each time - the background of the panel. The description should be only word or group of word delimited by a comma, no sentence. Always use the characters descriptions instead of their name in the cartoon panel description. Make sure to describe the characters appropriately in the description. You will also write the text of the panel. The text should not be more than 2 small sentences. Each sentence should start by the character name. Example input: Characters: Adrien is a guy with blond hair wearing glasses. Vincent is a guy with black hair wearing a hat. Adrien and vincent want to start a new product, and they create it in one night before presenting it to the board. Strictly stick to the format as mentioned in the example provided, Example output: # Panel 1 description: 2 guys, a blond hair guy wearing glasses, a dark hair guy wearing hat, sitting at the office, with computers text: Vincent: I think Generative AI are the future of the company. Adrien: Let's create a new product with it. # end Short Scenario: {scenario} Split the scenario in multiple parts:",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.image_links);
        setMessage(`Comic generated successfully!`);
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
           <label for="genre" className="publishpage-input-label">Select a country:</label>
            <select id="genre" name="genre" className="publishpage-input-field" onChange={(e) => setGenre(e.target.value)}>
              <option value="" disabled selected>-- Select a genre --</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Adventure">Adventure</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
            </select>
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
                    <img src={image} alt={`Comic Panel ${index + 1}`} className="carousel-image" 
                    style={{
                            width: '90%',
                            height: '400px',
                            borderRadius: '4px',
                            paddingLeft:'40px'
                      }} />
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
