"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function ReviewPage({
  orderId,
  productId,
  orderNumber,
  showAddReview,
  onClose,
}) {
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showModal = showAddReview;

  const ratingTexts = {
    0: "Terrible",
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Great",

    5: "Outstanding",
  };

  const updateProgress = () => {
    let progress = 0;
    if (currentRating > 0) progress += 40;
    if (reviewText.trim().length > 10) progress += 40;
    if (selectedPhotos.length > 0) progress += 20;
    return progress;
  };

  const closeModal = () => {
    setCurrentRating(0);
    setReviewText("");
    setSelectedPhotos([]);
    setIsSubmitting(false);
    // setShowModal(false);

    // Notify parent to hide this component
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handlePhotoUpload = (e) => {
  const files = Array.from(e.target.files);

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result; // base64 string
      setSelectedPhotos((prev) => [...prev, base64String]); // append to existing array
    };
    reader.readAsDataURL(file);
  });
};


  const submitReview = async () => {
    if (currentRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      toast.error("Please write a detailed review (at least 10 characters)");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("submitting review");
      console.log("selectedPhotos", selectedPhotos);
      console.log("currentRating", currentRating);
      console.log("reviewText", reviewText);
      console.log("productId", productId);
      console.log("orderNumber", orderNumber);
      // const response = await apiRequest(`/customer/reviews/add`, true, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     rating: currentRating,
      //     review_detail: reviewText,
      //     product_code: productId,
      //     order_id: orderNumber.toString(),
      //     image_path : selectedPhotos
      //   }),
      //   // photos: selectedPhotos,
      // });

      const response = await apiRequest(`/customer/reviews/add`, true, {
        method: "POST",
        body: JSON.stringify({
          rating: currentRating,
          review_detail: reviewText,
          product_code: productId,
          order_id: orderNumber.toString(),
          image_path: selectedPhotos|| "", 
        }),
      });

      // const response = await apiRequest("/customer/reviews/add", true, {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      // });
      console.log("response from submitReview", response);
      if (!response.success) {
        toast.error(
          response?.message ||
            "Failed to submit review. Please try again later !"
        );
      }
      if (response.success) {
        setTimeout(() => {
          // Reset form
          toast.success(
            response?.message ||
              "Review submitted successfully! Thank you for your feedback."
          );
          setCurrentRating(0);
          setReviewText("");
          setSelectedPhotos([]);
          setIsSubmitting(false);
          closeModal();
          // setShowModal(false);
        }, 1000);
      }
    } catch (error) {
      // console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again later !");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 rounded-lg max-w-md w-full max-h-[90vh] hide-scrollbar overflow-y-auto">
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
                          ? "text-yellow-400 drop-shadow-md"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="text-center text-gray-600 text-sm min-h-5">
                  {currentRating > 0
                    ? ratingTexts[currentRating]
                    : "Tap to rate"}
                </div>
              </div>

              {/* Review Text Section */}
              <div className="mb-6">
                <label className="block text-blue-600 font-medium mb-3 text-base">
                  Share your experience with us
                </label>
                <textarea
                  name="reviewText"
                  id="reviewText"
                  rows="4"
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your visit, treatment quality, staff behavior, and overall experience..."
                  className="w-full min-h-32 p-4 border-2 border-blue-100 rounded-xl text-sm leading-relaxed resize-y focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-10 transition-all duration-300"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="mb-8">
                <label className="relative block">
                  <div className="flex items-center justify-center p-4 border-2 border-dashed border-blue-600 rounded-xl cursor-pointer hover:bg-blue-50 transition-all duration-300 bg-blue-50 bg-opacity-30">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">📷</span>
                      </div>
                      <span className="text-blue-600 font-medium text-sm">
                        Add Photos
                      </span>
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
                      <div key={index} className="relative w-12 h-12">
                        <img
                          src={photo}
                          alt={`Preview ${index + 1}`}
                          className="w-12 h-12 rounded-lg object-cover border-2 border-blue-100"
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPhotos((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-700 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="w-full py-4 bg-[#bc3500] to-red--700 text-white font-semibold rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={submitReview}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0072bc] to-blue-800 text-white font-semibold rounded-xl text-base uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
