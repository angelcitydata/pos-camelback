import React from 'react';

const PaymentComplete = ({ onDone }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm min-h-175 flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Complete
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment has been processed successfully.
        </p>

        {onDone && (
          <button
            onClick={onDone}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-12 py-3 rounded-lg text-lg"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentComplete;
