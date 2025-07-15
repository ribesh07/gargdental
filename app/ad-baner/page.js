"use client";
import React from "react";

const AdBanner = ({ onClose }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl shadow-2xl overflow-hidden">
      {/* Cross Button */}
      {onClose && (
        <button
          className="absolute top-4 right-4 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md text-gray-700 text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close banner"
        >
          ×
        </button>
      )}
      {/* Floating Stars */}
      <div className="absolute top-12 left-12 text-yellow-300 text-xl animate-bounce">⭐</div>
      <div className="absolute top-32 left-24 text-yellow-300 text-lg animate-pulse">✨</div>
      <div className="absolute bottom-20 left-20 text-yellow-300 text-xl animate-bounce delay-1000">🌟</div>
      
      <div className="flex items-center justify-between h-full p-8">
        {/* Left Section - Megaphone and Logo */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Megaphone */}
          <div className="relative transform -rotate-12 mb-8">
            <div className="relative w-28 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-l-xl rounded-r-full shadow-lg flex items-center justify-center">
              {/* Hand */}
              <div className="absolute -left-12 top-4 w-14 h-10 bg-orange-200 rounded-full transform rotate-12"></div>
              {/* Megaphone Handle */}
              <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full border-4 border-white"></div>
              {/* Megaphone Cone */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-12 border-l-red-500 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
            </div>
            
            {/* Confetti */}
            <div className="absolute -top-4 -right-8 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping delay-300"></div>
            <div className="absolute -top-6 -right-12 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-500"></div>
            <div className="absolute -top-3 -right-16 w-2 h-2 bg-red-500 rounded-full animate-ping delay-700"></div>
            <div className="absolute -top-5 -right-20 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping delay-1000"></div>
          </div>
          
          {/* Logo */}
          <div className="flex flex-col items-center animate-pulse">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-l-full flex items-center justify-center mr-1 shadow-md">
                <div className="w-5 h-5 bg-white rounded-full mr-2"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-r-full flex items-center justify-center shadow-md">
                <div className="w-5 h-5 bg-white rounded-full ml-2"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">
                <span className="text-blue-600">Garg</span>
                <span className="text-cyan-400">Dental</span>
              </div>
              <div className="text-xs text-red-600 font-semibold">Total Solution Provider</div>
            </div>
          </div>
        </div>
        
        {/* Right Section - Main Content */}
        <div className="flex-1 bg-white bg-opacity-95 rounded-2xl p-8 ml-8 shadow-xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-red-500 block">GRAND</span>
              <span className="text-gray-800 block">OPENING</span>
            </h1>
            
            <div className="text-xl text-teal-600 font-bold mb-4">
              🦷 Modern Dental Care 🦷
            </div>
            
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              Welcome to our state-of-the-art dental facility!<br />
              Experience premium dental care with the latest technology<br />
              and compassionate service.
            </p>
            
            <div className="text-lg text-teal-600 font-bold">
              Your Smile, Our Priority
            </div>
          </div>
        </div>
      </div>
      
      {/* Developer Credit */}
      <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-700 transition-colors cursor-pointer">
        Developed by Global Tech Solution
      </div>
    </div>
  );
};

export default AdBanner;