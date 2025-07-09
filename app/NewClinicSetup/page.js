"use client";
import React from "react";

export default function ClinicSetupBenefits() {
  const benefits = [
    {
      title: "Installation Support",
      description: "Seamless And Reliable Installation Assistance.",
    },
    {
      title: "Continuous Support",
      description: "Support At All Steps Of Your Journey.",
    },
    {
      title: "Clinic Setup Consultation",
      description: "Clinic Layout And Design Consultation.",
    },
    {
      title: "Upfront Payment Benefit",
      description: "Exclusive Cashback For Full Payment Upfront.",
    },
    {
      title: "Post-Installation Care",
      description: "Free Post-Installation Maintenance.",
    },
    {
      title: "Flexible Customization",
      description: "Easy Customization As Per Your Needs.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto"> 
    <div className="max-w-7xl mx-auto mt-1 mb-3">
        <img src="https://dentalkart-images.s3.ap-south-1.amazonaws.com/clinic-setup-banner/New-Clinic-Setup-Guide-Banner-DT+(1).jpg">
        </img>

    </div>
    <div className="bg-[#f3f8ff] max-w-7xl max-auto py-10 px-4 flex flex-col items-center ">
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

      <button className="mt-10 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-all">
        Get Started
      </button>
    </div>
    </div>
  );
}
