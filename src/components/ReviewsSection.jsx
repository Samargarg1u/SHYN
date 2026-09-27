import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Sparkles } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/reviews';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('Banarasi Silk Zari Saree');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev = {
      id: Date.now(),
      name: name.trim(),
      city: city.trim() || 'India',
      rating: newRating,
      date: 'Today',
      product: productName,
      verified: true,
      comment: comment.trim()
    };

    setReviews([newRev, ...reviews]);
    setName('');
    setCity('');
    setComment('');
    setShowForm(false);
  };

  return (
    <section className="reviews-atelier-section">
      <div className="reviews-container">
        <div className="reviews-header-block">
          <div className="section-eyebrow">
            <Sparkles size={13} className="text-gold inline mr-1" />
            <span>AUTHENTIC BUYER TESTIMONIALS</span>
          </div>
          <h2 className="section-title">Cherished by Royalty Across India</h2>
          <p className="section-description">
            Read authentic stories and feedback from patrons who adorn our handloom Banarasi silk sarees and bespoke menswear.
          </p>

          <div className="reviews-stat-summary">
            <div className="stars-cluster">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="star-filled" />
              ))}
            </div>
            <strong className="score-text">4.8 out of 5</strong>
            <span className="divider">•</span>
            <span className="count-text">Based on 1,480+ Patron Reviews</span>

            <button
              type="button"
              className="write-review-btn"
              onClick={() => setShowForm(!showForm)}
            >
              <MessageSquarePlus size={16} />
              <span>{showForm ? 'Cancel Review' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Review Form */}
        {showForm && (
          <form onSubmit={handleSubmitReview} className="add-review-card">
            <h3>Share Your SHYN Experience</h3>
            <div className="rating-select-row">
              <span>Your Rating:</span>
              <div className="star-buttons-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-click-btn"
                    onClick={() => setNewRating(star)}
                  >
                    <Star
                      size={20}
                      className={star <= newRating ? 'star-filled' : 'star-empty'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>City / State</label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Your Review / Experience *</label>
              <textarea
                rows={3}
                placeholder="Share your thoughts on the drape, zari shine, packaging, or customer service..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-review-action">
              <span>Publish Patron Review</span>
            </button>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="reviews-cards-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-patron-card">
              <div className="review-top-meta">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rev.rating ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              <p className="review-quote">"{rev.comment}"</p>

              <div className="review-author-row">
                <div className="author-avatar">
                  {rev.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{rev.name}</h4>
                  <span className="author-loc">{rev.city}</span>
                </div>
                {rev.verified && (
                  <div className="verified-badge-chip">
                    <CheckCircle size={12} className="inline mr-1 text-green" />
                    <span>Verified Patron</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
