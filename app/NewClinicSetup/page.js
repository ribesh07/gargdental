import React from 'react';

const ClinicSetupBenefits = () => {
  const benefits = [
    {
      title: 'Installation Support',
      description: 'Seamless And Reliable Installation Assistance.'
    },
    {
      title: 'Continuous Support',
      description: 'Support At All Steps Of Your Journey.'
    },
    {
      title: 'Clinic Setup Consultation',
      description: 'Clinic Layout And Design Consultation.'
    },
    {
      title: 'Upfront Payment Benefit',
      description: 'Exclusive Cashback For Full Payment Upfront.'
    },
    {
      title: 'Post-Installation Care',
      description: 'Free Post-Installation Maintenance.'
    },
    {
      title: 'Flexible Customization',
      description: 'Easy Customization As Per Your Needs.'
    },
  ];

  return (
    <div className="bg-[#f3f8ff] min-h-screen py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
        What Added Benefits Do You Get With DentalKart’s New Clinic Setup?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md text-left border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-[#003366] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <button className="mt-10 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default ClinicSetupBenefits;
