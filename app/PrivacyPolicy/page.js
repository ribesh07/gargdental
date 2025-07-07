"use client"
import React from "react";

export default function PrivacyPolicy() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0072bc] mb-4">Privacy Policy</h1>
        <p className="text-gray-700 text-[15px] mb-6">
          This Privacy Policy explains how <strong>Garg Dental Pvt. Ltd.</strong> ("we", "our", "us") collects, uses, and protects your personal information when you visit or make a purchase from our website.
          By using our services, you agree to the terms outlined below.
        </p>
  
        {/* Section: What We Collect */}
        <h2 className="text-xl font-semibold mt-6 mb-2">1. What We Collect</h2>
        <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
          <li>Your name, address, email, and phone number</li>
          <li>Billing and shipping information</li>
          <li>Purchase history and product preferences</li>
          <li>IP address, browser/device type (for analytics)</li>
          <li>Messages and inquiries submitted through contact forms</li>
        </ul>
  
        {/* Section: How We Use It */}
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
          <li>To process and deliver your orders</li>
          <li>To send updates about your order or delivery</li>
          <li>To respond to your inquiries or support requests</li>
          <li>To improve our website and user experience</li>
          <li>To send you special offers, newsletters (only if you opt-in)</li>
        </ul>
  
        {/* Section: Data Sharing */}
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Who We Share It With</h2>
        <p className="text-[15px] text-gray-700 mb-2">
          We do not sell your personal data. However, we may share your information with:
        </p>
        <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
          <li>Trusted delivery partners to ship your order</li>
          <li>Payment gateways (e.g. eSewa, Khalti, Stripe) for secure transactions</li>
          <li>Legal authorities if required by law</li>
        </ul>
  
        {/* Section: Cookies */}
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies & Tracking</h2>
        <p className="text-[15px] text-gray-700">
          We use cookies to enhance your experience, analyze site traffic, and serve personalized content. You can
          choose to disable cookies in your browser, but some features may not work properly.
        </p>
  
        {/* Section: Data Security */}
        <h2 className="text-xl font-semibold mt-6 mb-2">5. How We Protect Your Data</h2>
        <p className="text-[15px] text-gray-700">
          Your information is stored on secure servers, and we use encryption and access controls to keep it safe.
          While no system is 100% hack-proof, we follow best practices to protect your privacy.
        </p>
  
        {/* Section: Your Rights */}
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p className="text-[15px] text-gray-700">
          You have the right to:
        </p>
        <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
          <li>Access the personal data we hold about you</li>
          <li>Request corrections or deletions of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>
  
        {/* Section: Third Party Services */}
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Third-Party Services</h2>
        <p className="text-[15px] text-gray-700">
          We may use services like Google Analytics, Meta Pixel, or payment providers. These tools may collect
          anonymized browsing behavior to improve functionality or marketing. Their privacy policies apply as well.
        </p>
  
        {/* Section: Policy Updates */}
        <h2 className="text-xl font-semibold mt-6 mb-2">8. Updates to This Policy</h2>
        <p className="text-[15px] text-gray-700">
          This privacy policy may be updated occasionally to reflect changes in laws or services. The last updated date
          will always be posted at the top.
        </p>
  
        {/* Section: Contact Info */}
        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p className="text-[15px] text-gray-700">
          If you have questions, concerns, or data access requests, please contact:
        </p>
        <p className="text-[15px] text-gray-800">
          📧 <strong>Email:</strong> privacy@gargdental.com<br />
          📞 <strong>Phone:</strong> +977-98XXXXXXXX<br />
          🏢 <strong>Address:</strong> Putalisadak, Kathmandu, Nepal
        </p>
      </div>
    );
  }
  