"use client";
import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { removeCustomerAccount } from "@/utils/customerApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const RemoveAccountModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const router = useRouter();

  const handleRemoveAccount = async () => {
    if (confirmationText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm account removal");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await removeCustomerAccount();
      
      if (result.success) {
        toast.success("Account removed successfully");
        
        // Clear local storage
        localStorage.removeItem("token");
        
        // Redirect to home page
        router.push("/");
      } else {
        toast.error(result.error || "Failed to remove account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Account removal error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Remove Account</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Trash2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Warning: This action cannot be undone</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Your account will be permanently deleted</li>
                  <li>• All your data will be lost</li>
                  <li>• You will lose access to your orders and history</li>
                  <li>• This action is irreversible</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              To confirm that you want to delete your account, please type <strong>DELETE</strong> in the field below:
            </p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Before you go:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Download any important information</li>
              <li>• Cancel any active subscriptions</li>
              <li>• Consider deactivating instead of deleting</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleRemoveAccount}
            disabled={isLoading || confirmationText !== "DELETE"}
            className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Remove Account
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAccountModal; 