import React, { useState, useEffect } from 'react';

const Community = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:3000/comics');
                const comicsData = await response.json();
                console.log('Fetched Comics Data:', comicsData);
                setComics(comicsData.comics);
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []);

    const handleVote = async (title, comicId, type, setVoteState) => {
        console.log(`${type} for comic with ID: ${comicId}`);

        try {
            const response = await fetch('http://localhost:3000/vote', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, comicId, type }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Vote response:', data.message);
                setVoteState(type); // Set vote state (Upvoted or Downvoted)
            } else {
                console.error('Error from backend:', data.message);
            }
        } catch (error) {
            console.error('Error sending vote request:', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Community</h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: '20px',
                padding: '20px',
            }}>
                {Array.isArray(comics) && comics.map((comic) => (
                    <ComicCard
                        key={comic._id}
                        comic={comic}
                        handleVote={handleVote}
                    />
                ))}
            </div>
        </div>
    );
};

const ComicCard = ({ comic, handleVote }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [readMore, setReadMore] = useState(false);
    const [voteState, setVoteState] = useState(null); // Track if upvoted or downvoted

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % comic.images_links.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            (prev - 1 + comic.images_links.length) % comic.images_links.length
        );
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '45%', // Adjusted for 2 cards per row
                margin: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                minHeight: '250px',
            }}
        >
            {/* Text Section */}
            <div style={{ flex: 1, padding: '10px' }}>
                <h4
                    style={{
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        color: '#333',
                        textAlign: 'left',
                    }}
                >
                    {comic.title || 'Untitled Comic'}
                </h4>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        textAlign: 'left',
                        lineHeight: '1.4',
                    }}
                >
                    {readMore
                        ? comic.scenario
                        : `${comic.scenario.substring(0, 80)}...`}
                    <button
                        onClick={() => setReadMore((prev) => !prev)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '12px',
                        }}
                    >
                        {readMore ? 'Read Less' : 'Read More'}
                    </button>
                </p>

                {/* Voting Buttons */}
                <div style={{ marginTop: '10px', textAlign: 'left' }}>
                    <button
                        style={{
                            margin: '5px',
                            padding: '6px 12px',
                            backgroundColor: voteState === 'Upvote' ?'rgb(0, 227, 76)' : '00802b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                        onClick={() => handleVote(comic.title, comic.user_id, 'Upvote', setVoteState)}
                    >
                        <span>👍</span> {/* Upvote Icon */}
                        {voteState === 'Upvote' ? 'Upvoted' : 'Upvote'}
                    </button>
                    <button
                        style={{
                            margin: '5px',
                            padding: '6px 12px',
                            backgroundColor: voteState === 'Downvote' ? ' #ff1a1a' : '#cc2900',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                        onClick={() => handleVote(comic.title, comic.user_id, 'Downvote', setVoteState)}
                    >
                        <span>👎</span> {/* Downvote Icon */}
                        {voteState === 'Downvote' ? 'Downvoted' : 'Downvote'}
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div style={{ flex: 1, position: 'relative', minHeight: '250px' }}>
                {comic.images_links.length > 0 && (
                    <img
                        src={comic.images_links[currentIndex]}
                        alt={comic.title || 'Comic Image'}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                )}

                {/* Carousel Controls */}
                {comic.images_links.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            ‹
                        </button>
                        <button
                            onClick={handleNext}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            ›
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Community;
