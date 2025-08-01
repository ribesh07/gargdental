"use client";
import { useState, useEffect } from "react";
import { getCancellationReasons } from "@/utils/apiHelper";
import { X, Loader2 } from "lucide-react";
import TermsCheckbox from "./TermsCheckbox";
import Link from "next/link";

export default function CancellationModal({
  isOpen,
  onClose,
  onConfirm,
  orderId,
  orderNumber,
}) {
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [reasonsLoading, setReasonsLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const handleCheckbox = () => {
    setAgreed(!agreed);
  };
  useEffect(() => {
    if (isOpen) {
      fetchReasons();
    }
  }, [isOpen]);

  const fetchReasons = async () => {
    try {
      setReasonsLoading(true);
      const result = await getCancellationReasons();
      if (result.success) {
        setReasons(result.reasons);
      } else {
        console.error("Failed to fetch reasons:", result.error);
      }
    } catch (error) {
      console.error("Error fetching reasons:", error);
    } finally {
      setReasonsLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedReason && !customReason.trim() && !agreed) {
      alert("Please select a reason or provide a custom reason");
      return;
    }

    setLoading(true);
    try {
      const reasonId = selectedReason;
      const iAgree = "Y";

      const description = customReason.trim();

      await onConfirm(orderNumber, reasonId, description, iAgree);
      onClose();
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-lg max-w-md w-full max-h-[90vh] hide-scrollbar overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Cancel Order #{orderNumber}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Please select a reason for cancelling this order:
          </p>

          {reasonsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading reasons...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Predefined reasons */}
              {reasons.map((reason) => (
                <label
                  key={reason.id}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={selectedReason === reason.id.toString()}
                    onChange={(e) => {
                      setSelectedReason(e.target.value);
                    }}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {reason.reason_name}
                  </span>
                </label>
              ))}

              {/* Custom reason */}
              <div className="mt-4">
                <p> Description</p>

                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Description for cancellation..."
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={handleCheckbox}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I have read and accepted the Cancellation{" "}
                <Link
                  href="/returnpolicy"
                  className="text-blue-600 underline cursor-pointer"
                >
                  terms{" "}
                </Link>
                <label>& policies</label>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={
                loading || (!selectedReason && agreed && !customReason.trim())
              }
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cancelling...
                </>
              ) : (
                "Cancel Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
