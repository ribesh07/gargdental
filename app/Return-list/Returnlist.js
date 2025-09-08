"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Download,
  Truck,
  CreditCard,
  Mail,
  Eye,
} from "lucide-react";

export default function DynamicReturnStatus() {
  const [returnItems, setReturnItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockReturnData = [
    {
      id: 1,
      returnNumber: "RET-2024-5678",
      orderNumber: "DS-2024-001234",
      productName: "BIOCRYL-C-CLEAR 2.0X125MM",
      brand: "SCHEU",
      returnAmount: "Rs. 1.00",
      status: "pending_approval",
      submittedDate: "2024-09-01",
      estimatedProcessing: "2-3 business days",
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      returnNumber: "RET-2024-5679",
      orderNumber: "DS-2024-001235",
      productName: "DENTAL IMPRESSION TRAY SET",
      brand: "DENTSPLY",
      returnAmount: "Rs. 850.00",
      status: "approved",
      submittedDate: "2024-08-28",
      labelGeneratedDate: "2024-08-29",
      image: "/api/placeholder/80/80",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReturnItems(mockReturnData);
      setLoading(false);
    }, 1000);
  }, []);

  const getButtonConfig = (item) => {
    switch (item.status) {
      case "pending_approval":
        return {
          text: "Under Review",
          className: "bg-orange-500 cursor-not-allowed text-white",
          icon: <Clock className="w-4 h-4" />,
          disabled: true,
          onClick: null,
        };

      case "approved":
        return {
          text: "Download Label",
          className: "bg-blue-600 hover:bg-blue-700 text-white",
          icon: <Download className="w-4 h-4" />,
          disabled: false,
          onClick: () =>
            alert(`Downloading return label for ${item.returnNumber}`),
        };

      case "label_sent":
        return {
          text: "Track Package",
          className: "bg-purple-600 hover:bg-purple-700 text-white",
          icon: <Truck className="w-4 h-4" />,
          disabled: false,
          onClick: () => alert(`Tracking ${item.trackingNumber}`),
        };

      case "in_transit":
        return {
          text: "Track Package",
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          icon: <Truck className="w-4 h-4" />,
          disabled: false,
          onClick: () => alert(`Tracking ${item.trackingNumber}`),
        };

      case "received":
        return {
          text: "Under Inspection",
          className: "bg-yellow-500 cursor-not-allowed text-white",
          icon: <Eye className="w-4 h-4" />,
          disabled: true,
          onClick: null,
        };

      case "rejected":
        return {
          text: "Return Rejected",
          className: "bg-red-500 cursor-not-allowed text-white",
          icon: <X className="w-4 h-4" />,
          disabled: true,
          onClick: null,
        };

      case "refunded":
        return {
          text: "Refund Complete",
          className: "bg-green-600 cursor-not-allowed text-white",
          icon: <CheckCircle className="w-4 h-4" />,
          disabled: true,
          onClick: null,
        };

      case "escalated":
        return {
          text: "Contact Support",
          className: "bg-indigo-600 hover:bg-indigo-700 text-white",
          icon: <Mail className="w-4 h-4" />,
          disabled: false,
          onClick: () => alert(`Contacting support for ${item.returnNumber}`),
        };

      default:
        return {
          text: "View Details",
          className: "bg-gray-600 hover:bg-gray-700 text-white",
          icon: <Eye className="w-4 h-4" />,
          disabled: false,
          onClick: () => alert(`Viewing details for ${item.returnNumber}`),
        };
    }
  };

  const getStatusBadge = (item) => {
    const badges = {
      pending_approval: {
        text: "Pending Approval",
        className: "bg-orange-100 text-orange-800",
      },
      approved: { text: "Approved", className: "bg-blue-100 text-blue-800" },
      label_sent: {
        text: "Label Sent",
        className: "bg-purple-100 text-purple-800",
      },
      in_transit: {
        text: "In Transit",
        className: "bg-blue-100 text-blue-800",
      },
      received: {
        text: "Received",
        className: "bg-yellow-100 text-yellow-800",
      },
      rejected: { text: "Rejected", className: "bg-red-100 text-red-800" },
      refunded: { text: "Refunded", className: "bg-green-100 text-green-800" },
      escalated: {
        text: "Escalated",
        className: "bg-indigo-100 text-indigo-800",
      },
    };

    const badge = badges[item.status] || badges.pending_approval;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${badge.className}`}
      >
        {badge.text}
      </span>
    );
  };

  const getAdditionalInfo = (item) => {
    switch (item.status) {
      case "pending_approval":
        return `Processing time: ${item.estimatedProcessing}`;
      case "approved":
        return `Label generated: ${item.labelGeneratedDate}`;
      case "label_sent":
        return `Tracking: ${item.trackingNumber}`;
      case "in_transit":
        return `Expected arrival: ${item.estimatedArrival}`;
      case "received":
        return `Received: ${item.receivedDate} • Status: ${item.inspectionStatus}`;
      case "rejected":
        return `Reason: ${item.rejectionReason}`;
      case "refunded":
        return `Refunded: ${item.refundedDate} • ${item.refundMethod}`;
      case "escalated":
        return `Assigned to: ${item.assignedTo}`;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your returns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">MY RETURNS</h2>
          <p className="text-gray-600">Track and manage your return requests</p>
        </div>

        {/* Return Items */}
        <div className="space-y-4">
          {returnItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No returns found
              </h3>
              <p className="text-gray-500">
                You haven't initiated any returns yet
              </p>
            </div>
          ) : (
            returnItems.map((item) => {
              const buttonConfig = getButtonConfig(item);
              const additionalInfo = getAdditionalInfo(item);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-2xl">🦷</div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                            {item.productName}
                          </h3>
                        </div>

                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm text-gray-600">
                            Brand: {item.brand}
                          </span>
                          {getStatusBadge(item)}
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <div>
                            Return #:{" "}
                            <span className="font-medium">
                              {item.returnNumber}
                            </span>
                          </div>
                          <div>
                            Order #:{" "}
                            <span className="font-medium">
                              {item.orderNumber}
                            </span>
                          </div>
                          <div>
                            Submitted:{" "}
                            <span className="font-medium">
                              {item.submittedDate}
                            </span>
                          </div>
                        </div>

                        <div className="text-xl font-bold text-green-600 mb-2">
                          {item.returnAmount}
                        </div>

                        {additionalInfo && (
                          <div className="text-sm text-gray-600 mb-3">
                            {additionalInfo}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="ml-6 flex-shrink-0">
                      <button
                        onClick={buttonConfig.onClick}
                        disabled={buttonConfig.disabled}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${buttonConfig.className}`}
                      >
                        {buttonConfig.icon}
                        <span>{buttonConfig.text}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
