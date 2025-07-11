// components/TermsCheckbox.js
import { useState } from 'react';

export default function TermsCheckbox() {
  const [agreed, setAgreed] = useState(false);

  const handleCheckbox = () => {
    setAgreed(!agreed);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="terms"
        checked={agreed}
        onChange={handleCheckbox}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="terms" className="text-sm text-gray-700">
        I agree to the <span className="text-blue-600 underline cursor-pointer">terms</span>
      </label>
    </div>
  );
}
