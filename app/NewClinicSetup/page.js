"use client"; // if you're in Next.js App Router

import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { toast } from "react-hot-toast";
import useInfoModalStore from "@/stores/infoModalStore";

export default function ClinicSetupPage() {
  const formRef = useRef(null);
  const [clinicData, setClinicData] = useState({
    imageUrl: null,
    videoTitle: "",
    videoUrl: "",
    videoDesc: "",
  });

  const [embedUrl, setEmbedUrl] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    budget: "",
    city: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiRequest("/clinic/clinic-setup/store", false, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = response;
      console.log("API response formData:", response);
      if (response.success) {
        // toast.success("Form submitted successfully!");
        useInfoModalStore.getState().open({
          title: "Success",
          message:
            response.message ||
            "Your form has been submitted successfully. We will get back to you shortly.",
        });
        console.log("Form submitted successfully:", result);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          city: "",
          budget: "",
          remarks: "",
        });
      } else {
        toast.error("Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    const convertToEmbedUrl = (url) => {
      const match = url?.match(
        /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^\s&]+)/
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    const embed = convertToEmbedUrl(
      clinicData?.videoUrl || "https://www.youtube.com/watch?v=jVEOjOFMJjM"
    );
    setEmbedUrl(embed);
  }, [clinicData?.videoUrl]);

  const scrollToForm = () => {
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop - 20, // Optional offset
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        console.log("Fetching clinic setup...");
        const response = await apiRequest("/clinic/clinic-setup", false);

        console.log("API response received:", response);

        if (!response?.clinic || !Array.isArray(response.clinic)) {
          console.warn("Clinic data is missing or not an array");
          return;
        }

        const clinicMap = Object.fromEntries(
          response.clinic.map((item) => [item.key, item])
        );

        const imageUrl =
          clinicMap["clinic_cover_image"]?.clinic_cover_image_full_url;
        const videoTitle = clinicMap["clinic_video_title"]?.value;
        const videoUrl = clinicMap["clinic_video_link"]?.value;
        const videoDesc = clinicMap["clinic_video_description"]?.value;

        console.log("Parsed Data:", {
          imageUrl,
          videoTitle,
          videoUrl,
          videoDesc,
        });

        setClinicData({
          imageUrl,
          videoTitle,
          videoUrl,
          videoDesc,
        });
      } catch (error) {
        console.log("Error fetching clinic setup data:", error);
        setClinicData({
          imageUrl: null,
          videoTitle: "Watch Our Clinic Setup Video",
          videoUrl: "https://www.youtube.com/",
          videoDesc:
            "Watch our detailed walkthrough of the clinic setup process and see how we can help you create your dream dental practice.",
        });
      }
    };
    fetchdata();
  }, []);

  const benefits = [
    {
      title: "End-to-End Setup Assistance",
      description:
        "From planning to procurement—we’ll help you at every stage.",
    },
    {
      title: "Exclusive Discounts",
      description: "Get setup packages with deals curated just for you.",
    },
    {
      title: "Expert Guidance",
      description:
        "Talk to specialists who know what your clinic really needs.",
    },
    {
      title: "Installation & Support",
      description: "Get everything delivered, installed, and ready to roll.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {clinicData?.imageUrl && (
        <div className="max-w-7xl mx-auto mt-1 mb-3">
          <img src={clinicData?.imageUrl} alt="Dental Clinic Setup" />
        </div>
      )}

      <div className="bg-[#f3f8ff] max-w-7xl mx-auto py-10 px-4 flex flex-col items-center ">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          {
            " What Added Benefits Do You Get With DentalKart’s New Clinic Setup?"
          }
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100"
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 w-full max-w-4xl p-6 rounded-xl shadow-md"

        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              required
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9\s\-]*$/.test(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }));
                }
              }}
              inputMode="numeric"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              required
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Budget (in lakhs)
            </label>
            <input
              required
              type="text"
              name="budget"
              value={formData.budget}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9\s\-]*$/.test(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    budget: value,
                  }));
                }
              }}
              placeholder="Ex: 5 - 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              required
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Any additional information"
              className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
  <button
    type="submit"
    className="bg-[#0072bc] text-white px-8 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer w-full md:w-auto"
  >
    Submit
  </button>
</div>

        </form>
      </div>

      {/* --- YouTube Video Section --- */}
      <div className="max-w-5xl mx-auto mt-12 px-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          {clinicData?.videoTitle || "Watch Our Clinic Setup Video"}
        </h2>
        <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
          {embedUrl && (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title={clinicData?.videoTitle || "Clinic Setup Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className=" flex mt-2">
          <p>{clinicData?.videoDesc}</p>
        </div>
      </div>
    </div>
  );
}
