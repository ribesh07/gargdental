"use client";
import React, { useState, useEffect } from "react";
import { HtmlDataConversion } from "@/components/HtmlDataConversion";
import { apiRequest } from "@/utils/ApiSafeCalls";
import TeamSection from "@/app/our-team/team-profile";

export default function AboutUsPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const fetchAboutUs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiRequest("/about-us", false);
        if (res.success) {
          setAboutData(res.data);
        } else {
          setError(res.message || "Failed to fetch About Us data.");
        }
      } catch (err) {
        setError("Failed to fetch About Us data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUs();
  }, []);

  useEffect(() => {
    const convertToEmbedUrl = (url) => {
      const match = url?.match(
        /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^\s&]+)/
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    const embed = convertToEmbedUrl(
      aboutData?.youtube_video || "https://www.youtube.com/watch?v=bVujKtgoq-U"
    );
    setEmbedUrl(embed);
  }, [aboutData?.youtube_video]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No data found.
      </div>
    );
  }

  return (
    <>
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50">
      {/* Video Section (if present) */}
      {aboutData.introduction_video_url && (
        <div className="max-w-7xl mx-auto h-100 relative overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src={aboutData.introduction_video_url} type="video/mp4" />
          </video>
        </div>
      )}

      {/* About Us Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
          <div>
            {aboutData.about_us_title && (
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {aboutData.about_us_title}
              </h2>
            )}
            {aboutData.about_us && (
              <HtmlDataConversion description={aboutData.about_us} />
            )}
          </div>
          <div className="flex justify-center">
            <div className="relative">
              {aboutData.youtube_video && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-full h-full sm:w-2xl sm:h-96 mr-9 ml-0.5 text-white overflow-hidden flex items-center justify-center">
                  <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title={aboutData?.youtube_video || "About Us"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section (dynamic) */}

      {aboutData.story_title && aboutData.stories?.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              {aboutData.story_title}
            </h2>

            <div className="space-y-16">
              {aboutData.stories.map((story, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* Left / Right depending on index */}
                  {index % 2 === 0 ? (
                    <>
                      {/* Image & Info */}
                      {story.image && (
                        <div className="flex justify-center">
                          <div className="relative text-center">
                            <img
                              src={story.image}
                              alt={story.name || `Story ${index + 1}`}
                              className="w-57 h-57 object-cover bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto"
                            />
                            {story.name && (
                              <h3 className="text-xl font-bold text-gray-900 mt-4">
                                {story.name}
                              </h3>
                            )}
                            {story.designation && (
                              <p className="text-sm text-gray-600">
                                {story.designation}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {/* Description */}
                      <div>
                        {story.description && (
                          <HtmlDataConversion description={story.description} />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Description first */}
                      <div>
                        {story.description && (
                          <HtmlDataConversion description={story.description} />
                        )}
                      </div>
                      {/* Image & Info */}
                      {story.image && (
                        <div className="flex justify-center">
                          <div className="relative text-center">
                            <img
                              src={story.image}
                              alt={story.name || `Story ${index + 1}`}
                              className="w-57 h-57 object-cover bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto"
                            />
                            {story.name && (
                              <h3 className="text-xl font-bold text-gray-900 mt-4">
                                {story.name}
                              </h3>
                            )}
                            {story.designation && (
                              <p className="text-sm text-gray-600">
                                {story.designation}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="text-lg font-semibold">10,000+ Dental Products</h3>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold">50+ Trusted Brands</h3>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="text-lg font-semibold">100% Original</h3>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-lg font-semibold">Assured Best Prices</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚙️</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Operational Excellence
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⏳</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Respect for Time
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Ownership and Accountability
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💎</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Inclusivity
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Customer Obsession
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Collaborative Growth
              </h3>
            </div>
          </div>
        </div>
      
      </div>
    
    </div>
     {/* Team Section */}
      <TeamSection />
    </>
  );
}
