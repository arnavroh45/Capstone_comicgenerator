import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null); // State to store user profile details
    const [comics, setComics] = useState([]); // State to store comics

    // Fetch user profile details
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/user_profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to the Authorization header
                        'Content-Type': 'application/json',
                    },
                });
                const profileData = await response.json();
                console.log('Fetched Profile Data:', profileData); // Debugging the response
                setUserProfile(profileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    // Fetch comics
    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:3000/user_comics1', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const comicsData = await response.json();
                console.log('Fetched Comics Data:', comicsData); // Debugging the response
                setComics(comicsData.comics);
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                padding: '20px',
            }}
        >
            {/* Left Panel */}
            <div
                style={{
                    flex: 1,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                }}
            >
                <h1 style={{ textAlign: 'center' }}>User Profile</h1>
                {userProfile ? (
                    <div>
                        <p><strong>Name:</strong> {userProfile.name}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <p><strong>Bio:</strong> {userProfile.bio || 'No bio provided.'}</p>
                        {/* Add other relevant user details here */}
                    </div>
                ) : (
                    <p>Loading user profile...</p>
                )}
            </div>

            {/* Right Panel */}
            <div
                style={{
                    flex: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                }}
            >
                <h1 style={{ textAlign: 'center' }}>User Comics</h1>
                {Array.isArray(comics) && comics.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {comics.map((comic) => (
                            <ComicCard key={comic._id} comic={comic} />
                        ))}
                    </div>
                ) : (
                    <p>Loading comics or no comics found...</p>
                )}
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
            
            {/* Scenario Read More */}
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

            {/* Carousel for Images */}
            <div style={{ position: 'relative', marginBottom: '10px' }}>
                {comic.images_links && comic.images_links.length > 0 && (
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

                {/* Carousel Navigation */}
                {comic.images_links && comic.images_links.length > 1 && (
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

export default ProfilePage;
