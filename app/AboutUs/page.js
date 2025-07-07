"use client"
import React from "react";

export default function AboutUs() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0072bc] mb-4">About Garg Dental</h1>
  
        <p className="text-gray-700 text-[15px] mb-6 leading-relaxed">
          Welcome to <strong>Garg Dental</strong> — Nepal’s trusted supplier of high-quality dental and medical equipment.
          We’re not just an e-commerce store; we are a dedicated team of professionals who believe in advancing
          oral healthcare across the country, one tool at a time.
        </p>
  
        <h2 className="text-xl font-semibold text-[#0072bc] mt-6 mb-2">🦷 Who We Are</h2>
        <p className="text-[15px] text-gray-700 leading-relaxed">
          Founded in 2022 and based in Kathmandu, Garg Dental is a legally registered company that serves clinics,
          hospitals, and dental professionals across Nepal. Our mission is to bridge the gap between international-grade
          medical products and local demand by providing fast, reliable, and certified solutions.
        </p>
  
        <h2 className="text-xl font-semibold text-[#0072bc] mt-6 mb-2">🎯 Our Mission</h2>
        <p className="text-[15px] text-gray-700 leading-relaxed">
          To empower dental professionals with easy access to trusted, certified equipment — without the middleman,
          without delays. We aim to become Nepal’s #1 online hub for dental innovation and quality care.
        </p>
  
        <h2 className="text-xl font-semibold text-[#0072bc] mt-6 mb-2">📦 What We Offer</h2>
        <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
          <li>Surgical Instruments & Dental Tools</li>
          <li>Dental Chairs & Imaging Devices</li>
          <li>Disposables & Hygiene Essentials</li>
          <li>Imported CE/FDA/DDA Certified Products</li>
          <li>Fast Delivery & Bulk Order Support</li>
        </ul>
  
        <h2 className="text-xl font-semibold text-[#0072bc] mt-6 mb-2">🤝 Why Choose Us?</h2>
        <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
          <li>Registered & Licensed in Nepal</li>
          <li>Verified Medical Certifications (ISO, CE, DDA, FDA)</li>
          <li>Reliable Local Support</li>
          <li>Easy Online Ordering & Tracking</li>
          <li>Cash on Delivery & Digital Payments Accepted</li>
        </ul>
  
        <h2 className="text-xl font-semibold text-[#0072bc] mt-6 mb-2">📍 Visit or Contact Us</h2>
        <p className="text-[15px] text-gray-700 leading-relaxed mb-2">
          Garg Dental Pvt. Ltd.<br />
          Putalisadak, Kathmandu, Nepal<br />
          <strong>Phone:</strong> +977-9800000000<br />
          <strong>Email:</strong> info@gargdental.com
        </p>
  
        <div className="mt-6">
          <a
            href="/BusinessReg"
            className="text-blue-600 underline hover:text-[#005a94] text-sm"
          >
            View Our Business Registration →
          </a>
        </div>
      </div>
    );
  }
  