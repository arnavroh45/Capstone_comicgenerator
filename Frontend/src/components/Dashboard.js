import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Footer from "./Footer";

function DashboardPage() {
  const navigate = useNavigate();

  const handlePublishClick = () => navigate("/publish");

  const carouselItems = [
    {
      title: "Mirza and Sahiba",
      description:
        "A series of visually rich and emotional comic panels that capture the poignant love story of Mirza and Sahiba.",
      category: "Comic - Fantasy",
      image:
        "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677566/Sahiba_born_in_a_rich_family_htyhnz.png",
    },
    {
      title: "Heer and Ranjha",
      description:
        "An enchanting tale of two souls deeply in love, overcoming hardships to preserve their bond.",
      category: "Comic - Romance",
      image:
        "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677566/Sahiba_born_in_a_rich_family_htyhnz.png",
    },
  ];

  const genres = [
    { name: "Fantasy", icon: "🎭" },
    { name: "Adventure", icon: "🗺️" },
    { name: "Romance", icon: "❤️" },
    { name: "Mystery", icon: "🕵️‍♂️" },
    { name: "Horror", icon: "👻" },
    { name: "Sci-Fi", icon: "🚀" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic carousel effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Every 3 seconds
    return () => clearInterval(slideInterval);
  }, [carouselItems.length]);

  const currentSlide =
    carouselItems[currentIndex] || carouselItems[0]; // Fallback to prevent undefined

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div id="naam" className="logo">
          AI ComicGen
        </div>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="/user_comics">Comics</a>
          <a href="/novels">Novels</a>
          <a href="/community">Community</a>
          <a href="/liked">Liked</a>
          <a href="/popular">Popular</a>
          <a href="/new">New</a>
          <input type="search" placeholder="Search" />
          <button className="btn-publish" onClick={handlePublishClick}>
            Publish
          </button>
        </nav>
      </header>

      {/* Spotlight Carousel */}
      <div className="spotlight">
        <div className="carousel-container">
          {/* Vote Now Button */}
          <button className="vote-now-btn">Vote Now</button>
          <div className="carousel-content">
            {/* Text Content */}
            <div className="text-content">
              <h3>{currentSlide.title}</h3>
              <p>{currentSlide.description}</p>
              <span className="category">{currentSlide.category}</span>
            </div>
            {/* Image Content */}
            <div className="image-content">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="carousel-image"
              />
            </div>

          </div>
          <div className="dots-navigation">
      {carouselItems.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentIndex ? "active" : ""}`}
          onClick={() => setCurrentIndex(index)}
        ></span>
      ))}
    </div>
        </div>
      </div>

      {/* Genre Cards */}
      <div className="genre-section">
        <h2>Explore Genres</h2>
        <div className="genre-container">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="genre-card"
              onClick={() => navigate(`/genres/${genre.name.toLowerCase()}`)}
            >
              <span className="genre-name">{genre.name}</span>
              <span className="genre-icon">{genre.icon}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;
