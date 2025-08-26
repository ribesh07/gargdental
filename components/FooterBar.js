"use client";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  ArrowUp,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { baseUrl } from "@/utils/config";
import Link from "next/link";
import { useEffect } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import MobileAppDownload from "@/app/playstore/playstore";

export default function FooterBar() {
  const [email, setEmail] = useState("");
  const [settings, setSettings] = useState({
    company_logo_footer: null,
    company_name: "Garg Dental",
    address: "",
    primary_email: "",
    primary_phone: "",
  });
  // const [gender, setGender] = useState("male");

  const handleSubscribe = async (email) => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    console.log("Subscribing:", { email });

    try {
      const response = await apiRequest("/newsletter-subscriber", false, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("Subscribe API response:", response);

      if (response.success) {
        setEmail("");
        toast.success(`${email} subscribed successfully!`);
      } else {
        toast.error(
          Array.isArray(response?.errors) && response.errors.length > 0
            ? response.errors[0].message
            : "Failed to subscribe"
        );
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await apiRequest("/settings", false);
      if (response.success) {
        // setSettings(response.settings);
        const {
          company_logo_footer,
          company_name,
          primary_phone,
          primary_email,
          address,
        } = response.settings;

        const footerLogo = company_logo_footer?.footer_logo_full_url || "";
        const primaryPhone = primary_phone?.value || "";
        const primaryEmail = primary_email?.value || "";
        const addressData = address?.value || "";
        const companyName = company_name?.value || "";
        setSettings({
          company_name: companyName,
          primary_phone: primaryPhone,
          company_logo_footer: footerLogo,
          primary_email: primaryEmail,
          address: addressData,
        });

        console.log("settings", response.settings);
      } else {
        console.error("Failed to fetch settings:", response.error);
        toast.error(response?.errors[0]?.message || "Failed to fetch settings");
        // setSettings();
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="relative w-full">
      {/* Main Footer */}
      <div className="bg-gradient-to-r from-[#446c87] via-[#76b9e6] to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {/* Contact Us Section */}
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-6">
                Contact Us
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-blue-200 flex-shrink-0" />
                    {settings.address ? (
                      <a
                        href={`https://www.google.com/maps/search/?q=${encodeURIComponent(settings.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm leading-relaxed  hover:underline "
                      >
                        {settings.address}
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm leading-relaxed text-gray-500">
                        No address provided
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {settings.primary_phone || "No phone number provided"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
                  <Link
                    href={`mailto:${settings.primary_email}`}
                    className="text-xs sm:text-sm hover:text-red-400  transition-colors"
                  >
                    {settings.primary_email || "No email provided"}
                  </Link>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href="https://www.facebook.com/gargdentalnpl/"
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.instagram.com/gargdentalpvt.ltd/"
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
              </div>

              
            </div>

            {/* Information Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="Main-Footer-title text-base sm:text-xl font-semibold mb-3 sm:mb-6 ml-10">
                Information
              </h3>
              <ul className="space-y-2 sm:space-y-3 Main-Footer-title Bottom-list-margin">
                <li className="footer-list">
                  <Link
                    href="/CompanyInfo"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Company Info
                  </Link>
                </li>
                <li className="footer-list">
                  <Link
                    href="/legal-registration"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Legal Registration
                  </Link>
                </li>
                {/* <li className="footer-list">
                  <Link
                    href="/MedicalCertification"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Medical Certifications
                  </Link>
                </li> */}

                <li className="footer-list">
                  <Link
                    href="/returnpolicy"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Return & Refund Policy
                  </Link>
                </li>
                <li className="footer-list">
                  <Link
                    href="/PrivacyPolicy"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Company Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="Main-Footer-title text-base sm:text-xl font-semibold mb-3 sm:mb-6 ml-9">
                Our Company
              </h3>
              <ul className="space-y-2 sm:space-y-3 Main-Footer-title Bottom-list-margin">
                <li className="footer-list">
                  <Link
                    href="/AboutUs"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li className="footer-list">
                  <Link
                    href="/ContactUs"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="footer-list">
                  <Link
                    href="/term&condition"
                    className="text-xs sm:text-sm hover:text-blue-200 transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-6">
                Join our Newsletter
              </h3>

              {/* Gender Selection */}
              {/* <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm">Male</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm">Female</span>
                </label>
              </div> */}

              {/* Email Subscription */}
              <div className="flex w-full rounded-md overflow-hidden shadow mr-12">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="flex-1 px-4 py-2 text-gray-900 bg-gray-50 border-none focus:outline-none text-sm"
                />
                <button
                  onClick={() => handleSubscribe(email)}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-3 text-[12px] font-semibold"
                >
                  SUBSCRIBE
                </button>
              </div>

              <p className="text-xs text-blue-100 text-center">
                Subscribe to the mailing list to receive updates on promotions,
                new arrivals, discount and coupons.
              </p>
              <div className="flex space-x-4 pt-10 ">
                <MobileAppDownload />
            </div>
            
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-800 text-gray-300 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-center sm:text-left">
              Copyright © 2025 Garg Dental All Right Reserved
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="mt-2 sm:mt-0 w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
