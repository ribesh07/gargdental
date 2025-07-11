"use client"
import React, { useEffect, useState } from "react";
import { fetchSettings } from "@/utils/apiHelper";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSettings = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchSettings();
      if (data && data.success && data.settings) {
        const settings = data.settings;
        const get = (key) => {
          const found = settings.find((s) => s.key === key);
          return found ? found.value : "";
        };
        setContact({
          company: get("company_name"),
          address: get("address"),
          phone: get("primary_phone"),
          email: get("primary_email"),
          map: get("map_url"),
        });
      } else {
        setError(data?.error || "Failed to load contact info");
      }
      setLoading(false);
    };
    getSettings();
  }, []);

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

  if (loading) return <div className="p-8 text-center">Loading contact info...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

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
            <p>{contact.company}<br />{contact.address}</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📞 Phone</h2>
            <p>{contact.phone}</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📧 Email</h2>
            <p>{contact.email}</p>
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

      {/* Map Embed */}
      {contact.map && (
        <div className="mt-10 w-full flex justify-center px-4">
          <div className="map-wrapper max-w-7xl w-full rounded overflow-hidden shadow">
            <div
              className="map-html"
              dangerouslySetInnerHTML={{ __html: contact.map }}
            />
          </div>
        </div>
      )}


    </div>
  );
}
