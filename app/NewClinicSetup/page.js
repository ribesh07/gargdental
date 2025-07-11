"use client"; // if you're in Next.js App Router

import React, { useRef } from "react";

export default function ClinicSetupPage() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop - 20, // Optional offset
        behavior: "smooth",
      });
    }
  };

  const benefits = [
    {
      title: "End-to-End Setup Assistance",
      description: "From planning to procurement—we’ll help you at every stage.",
    },
    {
      title: "Exclusive Discounts",
      description: "Get setup packages with deals curated just for you.",
    },
    {
      title: "Expert Guidance",
      description: "Talk to specialists who know what your clinic really needs.",
    },
    {
      title: "Installation & Support",
      description: "Get everything delivered, installed, and ready to roll.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto mt-1 mb-3">
        <img
          src="https://dentalkart-images.s3.ap-south-1.amazonaws.com/clinic-setup-banner/New-Clinic-Setup-Guide-Banner-DT+(1).jpg"
          alt="Dental Clinic Setup"
        />
      </div>

      <div className="bg-[#f3f8ff] max-w-7xl mx-auto py-10 px-4 flex flex-col items-center ">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          What Added Benefits Do You Get With DentalKart’s New Clinic Setup?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-[#003366] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-[15px]">{item.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToForm}
          className="mt-10 bg-gradient-to-r from-[#0072bc] to-[#0072bc] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer"
        >
          Get Started
        </button>
      </div>

      {/* --- Form Section Starts --- */}
      <div
        ref={formRef}
        className="bg-[#f3f8ff] max-w-7xl mx-auto py-10 px-4 flex flex-col items-center mt-2"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Setting Up A Dental Clinic? We've Got You Covered!
        </h2>

        <p className="ml-10">
          Starting a new dental clinic can be overwhelming—both financially and
          in terms of decision-making. That’s where DentalKart comes in. We're
          not just a supplier—we're your setup partner, guiding you to choose
          the right equipment while staying within budget. Our curated setup
          packages help you invest smartly and get your clinic up and running
          smoothly.
        </p>
      </div>

      <div className="bg-[#f3f8ff] max-w-6xl mx-auto py-10 px-4 flex flex-col items-center mt-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 ">
          Schedule Your Free Clinic Setup Call
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white w-5xl p-6 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Budget (in lakhs)
            </label>
            <input
              type="text"
              placeholder="Ex: 5 - 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              placeholder="Any additional information"
              className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
            ></textarea>
          </div>
        </form>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-[#0072bc] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>


      {/* --- YouTube Video Section --- */}
      <div className="max-w-5xl mx-auto mt-12 px-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Watch Our Clinic Setup Guide
        </h2>
        <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/jVEOjOFMJjM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
        </div>
        <div className=" flex mt-2">
        <p>Watch our detailed walkthrough of the clinic setup process and see how we can help you create your dream dental practice.</p>
        </div>
      </div>



    </div>
  );
}
