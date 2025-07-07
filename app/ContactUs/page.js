"use client"
import React from "react";

import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0072bc] mb-4">Contact Us</h1>
      <p className="text-gray-700 text-[15px] mb-6 leading-relaxed">
        Have a question? Need support with your order? Want to discuss bulk orders for your clinic? 
        Reach out to our team — we're here to help you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="text-[15px] text-gray-800 space-y-4">
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📍 Address</h2>
            <p>Garg Dental Pvt. Ltd.<br />Putalisadak, Kathmandu, Nepal</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📞 Phone</h2>
            <p>+977-9800000000</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📧 Email</h2>
            <p>info@gargdental.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="text-green-600 font-semibold">
              ✅ Message sent! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0072bc] text-white px-4 py-2 rounded hover:bg-[#005a94] transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Optional: Map Embed */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[#0072bc] mb-2">📍 Find Us on Map</h2>
        <div className="rounded overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!..." // <-- Replace with real location embed
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
