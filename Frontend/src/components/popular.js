import React, { useState, useEffect } from 'react';

const Popular = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:3000/popular');
                const comicsData = await response.json();
                setComics(comicsData.comics);
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []);

    const handleVote = async (title, comicId, type, setVoteStatus) => {
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
                setVoteStatus(type); // Update the vote status on successful response
            } else {
                console.error('Error from backend:', data.message);
            }
        } catch (error) {
            console.error('Error sending vote request:', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Trending Comics</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {Array.isArray(comics) &&
                    comics.map((comic) => (
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
    const [voteStatus, setVoteStatus] = useState(null); // Track the vote status

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % comic.images_links.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + comic.images_links.length) % comic.images_links.length);
    };

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '300px',
                textAlign: 'center',
                backgroundColor: '#fff',
                color: '#000',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h3 style={{ margin: '0 0 10px 0', color: '#000' }}>
                {comic.title || 'Untitled Comic'}
            </h3>

            <p style={{ color: '#000', lineHeight: '1.4', fontSize: '14px' }}>
                {readMore
                    ? comic.scenario
                    : `${comic.scenario.substring(0, 100)}...`}
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

            {/* Carousel for Images */}
            <div style={{ position: 'relative', marginBottom: '10px' }}>
                {comic.images_links.length > 0 && (
                    <img
                        src={comic.images_links[currentIndex]}
                        alt={comic.title || 'Comic Image'}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '4px',
                        }}
                    />
                )}
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
                            }}
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Voting Buttons */}
            <div style={{ marginTop: '10px' }}>
                <button
                    style={{
                        margin: '5px',
                        padding: '8px 16px',
                        backgroundColor: voteStatus === 'Upvote' ? 'darkgreen' : 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        opacity: voteStatus === 'Upvote' ? 0.8 : 1,
                    }}
                    onClick={() =>
                        handleVote(comic.title, comic.user_id, 'Upvote', setVoteStatus)
                    }
                >
                    {voteStatus === 'Upvote' ? 'Upvoted' : 'Upvote'}
                </button>
                <button
                    style={{
                        margin: '5px',
                        padding: '8px 16px',
                        backgroundColor: voteStatus === 'Downvote' ? 'darkred' : 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        opacity: voteStatus === 'Downvote' ? 0.8 : 1,
                    }}
                    onClick={() =>
                        handleVote(comic.title, comic.user_id, 'Downvote', setVoteStatus)
                    }
                >
                    {voteStatus === 'Downvote' ? 'Downvoted' : 'Downvote'}
                </button>
            </div>
        </div>
    );
};

export default Popular;
