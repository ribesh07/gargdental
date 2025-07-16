"use client";
import { useState } from 'react';

export default function ReviewPage() {
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingTexts = {
    1: 'Poor - Not satisfied',
    2: 'Fair - Below expectations',
    3: 'Good - Satisfactory',
    4: 'Very Good - Exceeded expectations',
    5: 'Excellent - Outstanding service'
  };

  const updateProgress = () => {
    let progress = 0;
    if (currentRating > 0) progress += 40;
    if (reviewText.trim().length > 10) progress += 40;
    if (selectedPhotos.length > 0) progress += 20;
    return progress;
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(photoPromises).then(photos => {
      setSelectedPhotos(photos);
    });
  };

  const submitReview = async () => {
    if (currentRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      alert('Please write a detailed review (at least 10 characters)');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your review! Your feedback helps us improve our dental services.');
      
      // Reset form
      setCurrentRating(0);
      setReviewText('');
      setSelectedPhotos([]);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen  p-5">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Progress Bar */}
        <div className="h-1 bg-blue-100 absolute top-0 left-0 right-0">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300"
            style={{ width: `${updateProgress()}%` }}
          />
        </div>

    
        {/* Form Content */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-blue-600 text-center mb-6">
            How was your experience?
          </h2>

          {/* Rating Section */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setCurrentRating(star)}
                  onMouseEnter={() => setCurrentRating(star)}
                  className={`text-4xl transition-all duration-300 hover:scale-110 ${
                    star <= currentRating 
                      ? 'text-yellow-400 drop-shadow-md' 
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="text-center text-gray-600 text-sm min-h-5">
              {currentRating > 0 ? ratingTexts[currentRating] : 'Tap to rate'}
            </div>
          </div>

          {/* Review Text Section */}
          <div className="mb-6">
            <label className="block text-blue-600 font-medium mb-3 text-base">
              Share your experience with us
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your visit, treatment quality, staff behavior, and overall experience..."
              className="w-full min-h-32 p-4 border-2 border-blue-100 rounded-xl text-sm leading-relaxed resize-y focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-10 transition-all duration-300"
            />
          </div>

          {/* Photo Upload Section - Made Smaller */}
          <div className="mb-8">
            <label className="relative block">
              <div className="flex items-center justify-center p-4 border-2 border-dashed border-blue-600 rounded-xl cursor-pointer hover:bg-blue-50 transition-all duration-300 bg-blue-50 bg-opacity-30">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-sm">📷</span>
                  </div>
                  <span className="text-blue-600 font-medium text-sm">Add Photos</span>
                </div>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
            
            {/* Photo Previews */}
            {selectedPhotos.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {selectedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Preview ${index + 1}`}
                    className="w-12 h-12 rounded-lg object-cover border-2 border-blue-100"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={submitReview}
            disabled={isSubmitting}
            className="w-full py-4 bg-[#0072bc] to-blue-800 text-white font-semibold rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
}