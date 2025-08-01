"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/utils/ApiSafeCalls";
import FullScreenLoader from "@/components/FullScreenLoader";
import useInfoModalStore from "@/stores/infoModalStore";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState({
    company_name: null,
    primary_phone: null,
    primary_email: null,
    address: null,
    map: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await apiRequest("/settings", false);
        if (response.success) {
          // setSettings(response.settings);
          const { company_name, primary_phone, primary_email, address } =
            response.settings;

          const primaryPhone = primary_phone?.value || "";
          const primaryEmail = primary_email?.value || "";
          const addressData = address?.value || "";
          const companyName = company_name?.value || "";
          setContact({
            company_name: companyName,
            primary_phone: primaryPhone,
            primary_email: primaryEmail,
            address: addressData,
            map: response.settings.map_url?.value || null,
          });

          console.log("settings", response.settings);
        } else {
          console.error("Failed to fetch settings:", response.error);
          toast.error(
            response?.errors[0]?.message || "Failed to fetch settings"
          );
          // setSettings();
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      console.log("Submitting form with data:", formData);
      const response = await apiRequest("/contact-us", false, {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.success) {
        useInfoModalStore.getState().open({
          title: "Success",
          message:
            response.message ||
            "Your form has been submitted successfully. We will get back to you shortly.",
        });
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(
          response?.errors[0]?.message ||
            "Failed to submit the form! Please try again later."
        );
        console.log("Form submission error:", response);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again later.");
    } finally {
      setTimeout(() => {
        setSubmitted(false);
      }, 3000); // Reset after 3 seconds
    }
  };

  if (loading) return <FullScreenLoader />;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0072bc] mb-4">Contact Us</h1>
      <p className="text-gray-700 text-[15px] mb-6 leading-relaxed">
        Have a question? Need support with your order? Want to discuss bulk
        orders for your clinic? Reach out to our team — we're here to help you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="text-[15px] text-gray-800 space-y-4">
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📍 Address</h2>
            <p>
              {contact.company_name && <strong>{contact.company_name}</strong>}
              <br />
              {contact.address}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📞 Phone</h2>
            <p>{contact.primary_phone}</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#0072bc] text-lg">📧 Email</h2>
            <p>{contact.primary_email}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
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
