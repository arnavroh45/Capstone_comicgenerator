import React, { useState, useEffect } from 'react';

const Community = () => {
    const [comics, setComics] = useState([]); // State to store fetched comics

    // Fetch comics when the component loads
    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:3000/comics');
                const comicsData = await response.json();
                console.log('Fetched Comics Data:', comicsData); // Check the data structure
                setComics(comicsData.comics); // Assuming the response contains the "comics" field with comic data
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []); // Empty dependency array to run this effect once

    // Handle Upvote and Downvote (for demonstration purposes)
    const handleVote = (comicId, type) => {
        console.log(`${type} for comic with ID: ${comicId}`);
        // Optionally, send this info to the backend
    };

    return (
        <div>
            <h1>Community</h1>
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
                        {comic.images_links && comic.strip_links.map((link, idx) => (
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
                        ))}
                        <div style={{ marginTop: '10px' }}>
                            <button
                                style={{
                                    margin: '5px',
                                    padding: '8px 16px',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleVote(comic._id, 'Upvote')}
                            >
                                Upvote
                            </button>
                            <button
                                style={{
                                    margin: '5px',
                                    padding: '8px 16px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleVote(comic._id, 'Downvote')}
                            >
                                Downvote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
