"use client";
import React, { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import useCartStore from "@/stores/useCartStore";
import Link from 'next/link';

export default function ReturnPage() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    returnReason: '',
    itemsToReturn: [],
    additionalComments: ''
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedItems = useCartStore((state) => state.selectedItems);

  const returnReasons = [
    'Defective or damaged item',
    'Wrong item received',
    'Item not as described',
    'Changed mind',
    'Size/fit issues',
    'Quality issues',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setStep(3);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      returnFiles: files,
    }));
  };

  // const renderStep1 = () => (
  //   <div className="space-y-6">
  //     <div className="text-center">
  //       <Package className="w-16 h-16 mx-auto text-blue-600 mb-4" />
  //       <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Return</h2>
  //       <p className="text-gray-600">Enter your order details to begin the return process</p>
  //     </div>

  //     <div className="space-y-4">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Order Number *
  //         </label>
  //         <input
  //           type="text"
  //           name="orderNumber"
  //           value={formData.orderNumber}
  //           onChange={handleInputChange}
  //           placeholder="e.g., ORD-12345"
  //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Email Address *
  //         </label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleInputChange}
  //           placeholder="your@email.com"
  //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //           required
  //         />
  //       </div>

  //       <button
  //         type="button"
  //         onClick={() => setStep(2)}
  //         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
  //       >
  //         Continue
  //       </button>
  //     </div>
  //   </div>
  // );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <RefreshCw className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Return Details</h2>
        <p className="text-gray-600">Tell us about your return request</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Return *
          </label>
          <select
            name="returnReason"
            value={formData.returnReason}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a reason</option>
            {returnReasons.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            placeholder="Please provide any additional details about your return..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attach Documents (Photos / Videos)
          </label>
          <input
            type="file"
            name="returnFiles"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
          
        </div>


        <div className="flex space-x-4">

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Submit Return Request'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="w-20 h-20 mx-auto text-green-600" />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Return Request Submitted!</h2>
        <p className="text-gray-600 mb-4">
          We've received your return request and will process it within 24 hours.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Return ID:</strong> RET-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-sm text-blue-800 mt-1">
            You'll receive an email with return instructions and a prepaid shipping label.
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setStep(1);
          setFormData({
            orderNumber: '',
            email: '',
            returnReason: '',
            itemsToReturn: [],
            additionalComments: ''
          });
        }}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Start Another Return
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/myaccount">
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Returns & Exchanges</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Return Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep2()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Return Policy */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="space-y-8">

                {/* Product Items */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h2 className="font-semibold text-gray-800">Product Items</h2>
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="w-18 h-18  rounded-lg flex items-center justify-center">
                          <div className="w-16 h-16  rounded flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Quantity x {item.quantity}
                          </p>
                          <p className="font-semibold text-gray-800">
                            Rs. {item.price}
                          </p>
                        </div>
                        {/* Remove button can be implemented if needed */}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center">
                      No items selected.
                    </div>
                  )}
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
}