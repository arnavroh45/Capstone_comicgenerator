import React, { useState, useEffect } from 'react';

const Popular = () => {
    const [comics, setComics] = useState([]); 
    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:3000/popular');
                const comicsData = await response.json();
                console.log('Fetched Comics Data:', comicsData); 
                setComics(comicsData.comics); 
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []); 

    
    const handleVote = async (title,comicId, type) => {
        console.log(`${type} for comic with ID: ${comicId}`);
    
        try {
            const response = await fetch('http://localhost:3000/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({title, comicId, type }), 
            });
    
            const data = await response.json(); 
            if (response.ok) {
                console.log('Vote response:', data.message); 
            } else {
                console.error('Error from backend:', data.message); 
            }
        } catch (error) {
            console.error('Error sending vote request:', error);
        }
    };
    return (
        <div>
            <h1>Trending Comics</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {Array.isArray(comics) && comics.map((comic) => (
                    <div
                        key={comic._id} 
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            maxWidth: '300px',
                            textAlign: 'center',
                        }}
                    >
                        <h3>{comic.title || 'Untitled Comic'}</h3>
                        <h4>{comic.scenario || 'Untitled Comic'}</h4>
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
                                onClick={() => handleVote(comic.title,comic.user_id, 'Upvote')}
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
                                onClick={() => handleVote(comic.title,comic.user_id, 'Downvote')}
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

export default Popular;
