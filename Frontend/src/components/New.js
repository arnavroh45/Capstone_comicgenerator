import React, { useState, useEffect } from 'react';

const New = () => {
    const [comics, setComics] = useState([]);
    useEffect(() => {
        const fetchComics = async (comicId) => {
            try {
                const response = await fetch('http://localhost:3000/new',{
                    method: 'GET', 
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                        'Content-Type': 'application/json', 
                    },
                });
                const comicsData = await response.json();
                console.log('Fetched Comics Data:', comicsData);
                setComics(comicsData.comics);
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>New Comics</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {Array.isArray(comics) &&
                    comics.map((comic) => (
                        <ComicCard key={comic._id} comic={comic} />
                    ))}
            </div>
        </div>
    );
};

const ComicCard = ({ comic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [readMore, setReadMore] = useState(false);

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
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '300px',
                textAlign: 'center',
            }}
        >
            <h3>{comic.title || 'Untitled Comic'}</h3>
            <p>
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
                    }}
                >
                    {readMore ? 'Read Less' : 'Read More'}
                </button>
            </p>
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
        </div>
    );
};

export default New;
