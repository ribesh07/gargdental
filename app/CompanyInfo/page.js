export default function CompanyInfo() {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0072bc] mb-6">Company Information</h1>
  
        <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
          Below is the official business information of <strong>Garg Dental Pvt. Ltd.</strong> — legally registered and fully compliant with Nepali business and healthcare regulations. All information listed is accurate and up to date as of July 2025.
        </p>
  
        <div className="border border-gray-300 rounded-lg p-6 bg-white text-[15px] text-gray-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">🆔 Legal Business Name</h2>
            <p>Garg Dental Pvt. Ltd.</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">📋 Registration Number</h2>
            <p>123456/078/079</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">🪪 PAN / VAT Number</h2>
            <p>302938472</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">📅 Date of Incorporation</h2>
            <p>March 15, 2022</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">📍 Registered Office Address</h2>
            <p>Putalisadak, Kathmandu, Bagmati Province, Nepal</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">📦 Primary Business Activities</h2>
            <ul className="list-disc pl-5 mt-1">
              <li>Import and distribution of dental and medical equipment</li>
              <li>Wholesale and retail supply to clinics and hospitals</li>
              <li>E-commerce operations for medical-grade devices</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-[#0072bc]">🧾 Bank Details (On Request)</h2>
            <p>
              Official bank account and SWIFT code are available for authorized vendors and institutional clients upon request.
              Contact: <a href="mailto:accounts@gargdental.com" className="text-blue-600 underline">accounts@gargdental.com</a>
            </p>
          </div>
        </div>
  
        <div className="mt-8 text-[14px] text-gray-600">
          <p>For further verification, please refer to our <a href="/BusinessReg" className="text-blue-600 underline">Business Registration</a> and <a href="/MedicalCertification" className="text-blue-600 underline">Medical Certifications</a>.</p>
        </div>
      </div>
    );
  }
  