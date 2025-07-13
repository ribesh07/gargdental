"use client";
import React from "react";
import toast from "react-hot-toast";


const Complains = () => {
  return (
    <div>
      <div className="bg-[#f3f8ff] max-w-6xl mx-auto py-10 px-4 flex flex-col items-center mt-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 ">
          Customer Complaint Form
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white w-3xl p-6 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input

              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="Enter 10-digit phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digits
              }}
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>



          <div>
            <label className="block text-sm font-medium mb-1 ">Remarks</label>
            <textarea
              placeholder="Any additional information"

              className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
            ></textarea>
          </div>
        </form>

        <div className="text-center mt-8">
          <button
            type="submit"
            
            onClick={() => toast.success("Under Development!")}
            className="bg-[#0072bc] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default Complains;
