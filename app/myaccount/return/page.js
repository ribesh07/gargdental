"use client";
import React, { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Package className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Return</h2>
        <p className="text-gray-600">Enter your order details to begin the return process</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Number *
          </label>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleInputChange}
            placeholder="e.g., ORD-12345"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="button"
          onClick={() => setStep(2)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
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

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Back
          </button>
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

  const renderStep3 = () => (
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
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
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
              {step === 3 && renderStep3()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Return Policy */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Policy</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">30-Day Return Window</p>
                    <p className="text-sm text-gray-600">Returns accepted within 30 days of delivery</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Original Packaging</p>
                    <p className="text-sm text-gray-600">Items must be in original condition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Return Shipping</p>
                    <p className="text-sm text-gray-600">We provide prepaid return labels</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Timeline */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Return received</span>
                  <span className="text-sm font-medium text-gray-900">1-2 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quality inspection</span>
                  <span className="text-sm font-medium text-gray-900">2-3 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Refund processed</span>
                  <span className="text-sm font-medium text-gray-900">3-5 days</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}