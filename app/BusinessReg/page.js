"use client";
import React from "react";
import TawkToWidget from "@/components/TawkToWidget";

export default function BusinessRegistration() {
  return (
    <>
      <TawkToWidget />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0072bc] mb-4">
          Business Registration
        </h1>

        <p className="text-gray-700 text-[15px] mb-6">
          Garg Dental is a legally registered business in Nepal. We are
          committed to upholding the highest standards in compliance, product
          sourcing, and customer service. Our business operations are fully
          authorized under the Government of Nepal's company laws and healthcare
          regulations.
        </p>

        <div className="border border-gray-300 p-4 rounded-lg shadow bg-white mb-6">
          <h2 className="text-xl font-semibold mb-2 text-[#0072bc]">
            Company Details
          </h2>
          <ul className="text-gray-800 text-[15px] space-y-1">
            <li>
              <strong>Company Name:</strong> Garg Dental Pvt. Ltd.
            </li>
            <li>
              <strong>Registration Number:</strong> 123456/078/079 (Example)
            </li>
            <li>
              <strong>PAN/VAT Number:</strong> 302938472 (Example)
            </li>
            <li>
              <strong>Registered Office:</strong> Putalisadak, Kathmandu, Nepal
            </li>
            <li>
              <strong>Date of Incorporation:</strong> March 15, 2022
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#0072bc] mb-2">
            Download Registration Certificate
          </h2>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0072bc] text-white px-4 py-2 rounded hover:bg-[#005a94] transition-colors"
          >
            📥 Download Certificate (PDF)
          </a>
        </div>

        <div className="text-sm text-gray-600">
          <p>For verification or legal inquiries, please contact us at:</p>
          <p>
            <strong>Email:</strong> legal@gargdental.com
          </p>
          <p>
            <strong>Phone:</strong> +977-9800000000
          </p>
        </div>
      </div>
    </>
  );
}
