import React, { useState, useEffect } from 'react';

const Comics = () => {
    const [comics, setComics] = useState([]); // State to store fetched comics

    // Fetch comics when the component loads
    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:3000/user_comics1');
                const comicsData = await response.json();
                console.log('Fetched Comics Data:', comicsData); // Check the data structure
                setComics(comicsData.comics); // Assuming the response contains the "comics" field with comic data
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []); 


    return (
        <div>
            <h1>User Comics</h1>
            <h3>Title: 5 friends</h3>
            <h4>Scenario: Generate a visually engaging scene depicting five friends presenting their AI comic generator project in a modern conference room. The friends, dressed in semi-formal attire, stand confidently near a large screen showcasing vibrant comic panels inspired by Indian folktales. The group is diverse in appearance, with one friend passionately explaining the project, another pointing at the screen, and others holding devices like a laptop, notepad, or tablet. Seated across from them at a sleek table are three judges, attentively listening and taking notes. The room is well-lit, with a professional ambiance featuring clean, modern decor. The comic panels on the screen are colorful and dynamic, with intricate details capturing the essence of storytelling. A tagline, 'Reimagining Stories, One Comic at a Time,' is subtly displayed beneath the visuals. The atmosphere exudes teamwork, innovation, and determination as the team presents their cutting-edge creation.</h4>
            {/* <img 
            src="http://res.cloudinary.com/dfntvlmqc/image/upload/v1733485190/CR7agam_be21%40thapar.edu_comic/5%20friends/panel_1.png" 
            alt="Comic Panel 1" 
            style={{ width: '600px', height: 'auto', borderRadius: '8px' }} 
            /> */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {Array.isArray(comics) && comics.map((comic) => (
                    <div
                        key={comic._id} // Using _id from the database
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            maxWidth: '300px',
                            textAlign: 'center',
                        }}
                    >
                        <h3>{comic.title || 'Untitled Comic'}</h3>
                        {/* Check if images_links exists */}
                        {comic.images_links && comic.images_links.length > 0 ? (
                            comic.images_links.map((link, idx) => (
                                <img
                                    key={idx}
                                    src={link}
                                    alt={comic.title || 'Untitled'} // Descriptive alt text without redundancy
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '4px',
                                    }}
                                />
                            ))
                        ) : (
                            <p>No images available for this comic.</p> // Fallback text if no images are available
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comics;
