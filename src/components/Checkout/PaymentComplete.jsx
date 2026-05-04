import React from 'react';

const PaymentComplete = ({ onDone }) => {
  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-2xl items-center justify-center">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <svg
              className="w-12 h-12 text-green-600"
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

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Payment Complete
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          Your payment has been processed successfully.
        </p>

        {onDone && (
          <button
            onClick={onDone}
            className="w-full p-4 text-base font-extrabold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 rounded-lg hover:bg-green-700 hover:border-green-700 hover:cursor-pointer active:bg-green-800"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentComplete;
