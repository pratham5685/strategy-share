import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import copy from "copy-to-clipboard";
import "./home.css"
export const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get("http://localhost:3001/reviews");
        setReviews(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReview();
  }, []);

  const saveReview = async (reviewID) => {
    try {
      const response = await axios.put("http://localhost:3001/reviews", {
        reviewID,
        userID,
      });

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchButtonClick = () => {
    const filtered = reviews.filter((review) =>
      review.companyNRole.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const handleShare = (reviewID) => {
    const reviewURL = `http://yourwebsite.com/reviews/${reviewID}`;
    copy(reviewURL);
    const updatedReviews = reviews.map((review) =>
      review._id === reviewID ? { ...review, copied: true } : review
    );
    setReviews(updatedReviews);
  };

  return (
    <div className="container">
      <h1 className="title">Reviews</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search reviews"
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearchButtonClick} className="search-button">
          Search
        </button>
      </div>
      <ul className="review-list">
        {searchQuery
          ? filteredReviews.map((review) => (
              <li key={review._id} className="review-item">
                <div className="review-header">
                  <h2 className="company-role">{review.companyNRole}</h2>
                  <button
                    onClick={() => handleShare(review._id)}
                    className="share-button"
                  >
                    Share
                  </button>
                </div>
                <div className="review-details">
                  <p className="connect">{review.connect}</p>
                  <p className="review-content">{review.content}</p>
                  <p className="difficulty">Difficulty: {review.difficulty}</p>
                  {review.copied && <p className="copy-message">Review URL copied!</p>}
                </div>
              </li>
            ))
          : reviews.map((review) => (
              <li key={review._id} className="review-item">
                <div className="review-header">
                  <h2 className="company-role">{review.companyNRole}</h2>
                  <button
                    onClick={() => handleShare(review._id)}
                    className="share-button"
                  >
                    Share
                  </button>
                </div>
                <div className="review-details">
                  <p className="connect">{review.connect}</p>
                  <p className="review-content">{review.content}</p>
                  <p className="difficulty">Difficulty: {review.difficulty}</p>
                  {review.copied && <p className="copy-message">Review URL copied!</p>}
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};
