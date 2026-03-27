import React from 'react';

const ProcessingScreen = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm min-h-[700px] flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Credit Card Animation */}
        <div className="mb-8 relative">
          {/* Card */}
          <div className="w-64 h-40 bg-linear-to-br from-blue-500 to-blue-700 rounded-xl shadow-xl relative overflow-hidden animate-pulse">
            {/* Card shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
            
            {/* Card chip */}
            <div className="absolute top-6 left-6 w-12 h-10 bg-yellow-400 rounded opacity-80"></div>
            
            {/* Card number placeholder */}
            <div className="absolute bottom-12 left-6 right-6 flex gap-4">
              <div className="flex-1 h-3 bg-white/30 rounded"></div>
              <div className="flex-1 h-3 bg-white/30 rounded"></div>
              <div className="flex-1 h-3 bg-white/30 rounded"></div>
              <div className="flex-1 h-3 bg-white/30 rounded"></div>
            </div>
            
            {/* Card holder name */}
            <div className="absolute bottom-4 left-6 h-2 w-32 bg-white/30 rounded"></div>
          </div>
          
          {/* Processing circles */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]"></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-8">Processing Payment</h1>
        <p className="text-gray-600">Please wait while we securely process your payment...</p>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProcessingScreen;
