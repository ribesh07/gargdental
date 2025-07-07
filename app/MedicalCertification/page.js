"use client"
import React from "react";

export default function MedicalCertifications() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-[#0072bc] mb-4">Medical Certifications</h1>



            <p className="text-gray-700 text-[15px] mb-6">
                At <strong>Garg Dental</strong>, we only deal in medical and dental equipment that meet
                recognized national and international certification standards. We work with manufacturers and importers
                who follow strict regulatory compliance, ensuring that the products we deliver are safe, reliable,
                and approved for clinical use.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center">
                    <img
                        src="/assets/iso_9001.jpeg"
                        alt="ISO 9001 Certified" className="h-25 w-25" />
                    <p className="text-sm mt-2 text-center">ISO 13485:2016<br />Medical Device QMS</p>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src="/assets/ce.jpeg"
                        alt="CE Certified" className="h-25 w-25" />
                    <p className="text-sm mt-2 text-center">CE Mark (Europe)<br />Conformité Européenne</p>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src="/assets/fda-certificate.webp"
                        alt="FDA Certified" className="h-25 w-25" />
                    <p className="text-sm mt-2 text-center">FDA (USA)<br />Food & Drug Administration</p>
                </div>

            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#0072bc] mb-2">Download Certifications</h2>
                <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-2">
                    <li>
                        <a href="3" target="_blank" className="text-blue-600 underline">
                            ISO 13485:2016 Certificate (PDF)
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" className="text-blue-600 underline">
                            CE Certification – Surgical Tools (PDF)
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" className="text-blue-600 underline">
                            FDA Import Approval – Dental Products (PDF)
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" className="text-blue-600 underline">
                            DDA Authorization Letter – Nepal (PDF)
                        </a>
                    </li>
                </ul>
            </div>

            <p className="text-sm text-gray-600">
                ⚠️ Note: Certification may vary depending on the product and manufacturer. For specific product compliance,
                please check the product detail page or contact us at <strong>support@gargdental.com</strong>.
            </p>
        </div>
    );
}
