import React, { useState } from 'react';
import './PublishPage.css';
import background from '../assets/background.png'; // Update the path if necessary

const PublishPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate input
    if (!title || !description) {
      setMessage('Please fill in both the title and description.');
      return;
    }

    setLoading(true); // Show loading state while the request is in progress

    // API call to generate the comic
    try {
      const response = await fetch('http://127.0.0.1:8000/generate_comic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token for authentication
        },
        body: JSON.stringify({
          title,
          scenario: description, // Assuming 'description' corresponds to the 'scenario'
          style: "Epic, dramatic, vibrant, detailed, contrasting, traditional, dynamic, emotional, mythological, intense.", // Replace with the actual style if applicable
          template: "You are a cartoon creator. You will be given a short scenario, which you must split into multiple parts. Each part represents a different cartoon panel. For each panel: Description: Provide a detailed description of the panel. Use concise, descriptive phrases separated by commas to define: The characters in the panel, described each time (appearance, clothing, and actions). The background of the panel (specific setting, objects, and mood). Text: Provide the dialogue or narration for the panel in the form of two small sentences, one per character (if applicable). Ensure each sentence starts with the character's name. Rules: Use the given character descriptions instead of their names when describing the panel. Stick strictly to the format in the example. Ensure the output is structured, visually descriptive, and limited to the specified elements. Example input: Characters: Adrien: a guy with blond hair wearing glasses. Vincent: a guy with black hair wearing a hat. Scenario: Adrien and Vincent want to start a new product, and they create it in one night before presenting it to the board. Example output: # Panel 1 Description: 2 guys, a blond hair guy wearing glasses, a dark hair guy wearing a hat, sitting at the office, with computers, desk cluttered with papers and coffee cups, nighttime outside the window Text: Vincent: I think Generative AI are the future of the company. Adrien: Let's create a new product with it. # Panel 2 Description: a blond hair guy wearing glasses, typing on a keyboard, a dark hair guy wearing a hat, sketching on a tablet, office room with dim lighting, papers and sketches scattered everywhere Text: Adrien: We need to finish this by morning! Vincent: I'm already designing the interface. Short Scenario: {scenario} Split the scenario into multiple parts. ", // Replace with the actual template if applicable
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Comic generated successfully: ${data.message}`);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || 'Failed to generate comic.'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
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
            onChange={(e) => setTitle(e.target.value)} // Update title state
          />
          <label htmlFor="description" className="publishpage-input-label">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Give a brief description of your comic"
            className="publishpage-input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state
          />
          <button
            id="submit"
            className="publishpage-publish-button"
            onClick={handlePublish} // Trigger API call
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="publishpage-content">
        <div className="publishpage-output-section">
          <div className="publishpage-output-placeholder">
            {message && <p className="publishpage-message">{message}</p>} {/* Display messages */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;