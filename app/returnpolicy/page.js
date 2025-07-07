'use client'
import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 bg-white rounded-xl shadow mt-6 mb-10 text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
        <span role="img" aria-label="tooth">🦷</span> Garg Dental – Return & Refund Policy
      </h1>
      <div className="text-sm text-gray-500 mb-6">Last Updated: July 7, 2025</div>
      <p className="mb-4">
        At Garg Dental, we strive to ensure you are fully satisfied with your purchase. However, due to the sensitive nature of dental and medical products, certain restrictions apply to returns and refunds. Please review our policy below before making a purchase.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
        <span role="img" aria-label="return">🔄</span> Eligible Returns
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>You received a damaged, defective, or incorrect product.</li>
        <li>The item is unused, unopened, and in its original packaging.</li>
        <li>The return request is initiated within 7 days of delivery.</li>
        <li>Proof of purchase (invoice/receipt) must be provided.</li>
      </ul>
      <div className="mb-4 text-yellow-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
        <span className="font-semibold">⚠️ Note:</span> We do not accept returns due to change of mind or wrong selection. Please read product descriptions carefully before purchasing.
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
        <span role="img" aria-label="no return">🚫</span> Non-Returnable Items
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Opened or used dental tools/instruments.</li>
        <li>Products that are sterilized or labeled as "single-use".</li>
        <li>Custom orders and bulk items.</li>
        <li>Any item marked as "Non-returnable" on the product page.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
        <span role="img" aria-label="refund">💸</span> Refund Process
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Once your return is received and inspected, we will notify you via email or SMS regarding the approval or rejection of your refund.</li>
        <li>If approved, the refund will be processed within 7–10 business days.</li>
        <li>Refunds will be issued to the original payment method only.</li>
        <li>In case of Cash on Delivery, refunds will be issued via bank transfer or wallet.</li>
      </ul>
      <div className="mb-4 text-blue-700 bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
        <span className="font-semibold">🔁 Exchange Option:</span> If the product is defective, we may offer a replacement instead of a refund.
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
        <span role="img" aria-label="shipping">📦</span> Return Shipping
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Return shipping costs are the responsibility of the customer unless the item was delivered damaged or incorrect.</li>
        <li>We recommend using a trackable shipping service or purchasing shipping insurance. We are not responsible for lost return shipments.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
        <span role="img" aria-label="request">📝</span> How to Request a Return
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Email us at <a href="mailto:returns@gargdental.com" className="text-blue-700 underline">returns@gargdental.com</a> within 7 days of delivery.</li>
        <li>Include your order ID, product details, and reason for return.</li>
        <li>Attach clear photos if the item is damaged or defective.</li>
        <li>Wait for return authorization before shipping the product.</li>
      </ul>
    </div>
  );
}
