import React, { useState } from 'react';

const CheckoutMethod = ({ storedPaymentMethods, onProcess, onGoBack }) => {
  const [cardPresent, setCardPresent] = useState(null);
  const [keepLocal, setKeepLocal] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
console.log('Stored Payment Methods:', storedPaymentMethods);
  const handleProcess = () => {
    const checkoutData = {
      cardPresent,
      keepLocal,
      selectedPaymentMethod: selectedPaymentMethod !== null ? storedPaymentMethods[selectedPaymentMethod].id : null
    };
    onProcess(checkoutData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm min-h-[800px] flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center mb-4">Checkout Method</h1>

        <p className="text-center text-gray-600 text-sm mb-6">
          Choose how you'd like to collect this payment and where to send the
          checkout.
        </p>

        {/* Card Present / Not Present */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => setCardPresent(true)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              cardPresent === true
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <div className="font-bold text-lg mb-1">Card Present</div>
            <div className="text-xs text-gray-600">
              Use a physical card with your terminal.
            </div>
          </button>

          <button
            onClick={() => setCardPresent(false)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              cardPresent === false
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <div className="font-bold text-lg mb-1">Card Not Present</div>
            <div className="text-xs text-gray-600">
              Key in card details, send a link, or choose a stored payment
              method
            </div>
          </button>
        </div>

        {/* Where should checkout happen */}
        {cardPresent === false && (
          <div className="mb-5">
            <p className="text-gray-700 text-sm mb-2">
              Where should this checkout happen?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setKeepLocal(false)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  keepLocal === false
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <div className="font-bold text-lg mb-1">Send to Customer</div>
                <div className="text-xs text-gray-600">
                  Email or text a secure payment
                </div>
              </button>

              <button
                onClick={() => setKeepLocal(true)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  keepLocal === true
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <div className="font-bold text-lg mb-1">Keep Local</div>
                <div className="text-xs text-gray-600">
                  Perform the checkout here
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Stored Payment Methods */}
        {cardPresent === false &&
          keepLocal === true &&
          storedPaymentMethods &&
          storedPaymentMethods.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-700 text-sm mb-2">
                To use a stored payment, select one of these.
              </p>

              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-300">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                        Customer Payment Methods
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                        Brand
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                        Last four
                      </th>
                      <th
                        className="text-left px-4 py-3 text-sm font-semibold text-gray-700"
                        colSpan="2"
                      >
                        Expiration
                      </th>
                      <th className="w-12 px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    { storedPaymentMethods && storedPaymentMethods.map((method, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedPaymentMethod(index)}
                      >
                        <td className="px-4 py-3">{method.type || ""}</td>
                        <td className="px-4 py-3">
                          {method.card?.brand || ""}
                        </td>
                        <td className="px-4 py-3">
                          {method.card?.last4 || ""}
                        </td>
                        <td className="px-4 py-3">
                          {method.card?.exp_month || ""}
                        </td>
                        <td className="px-4 py-3">
                          {method.card?.exp_year || ""}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedPaymentMethod === index}
                            onChange={() => setSelectedPaymentMethod(index)}
                            className="w-5 h-5 accent-gray-400"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>

      {/* Process Button */}
      <div className="mt-auto">
        <button
          onClick={handleProcess}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-lg mb-3"
        >
          Process
        </button>

        {/* Go Back Link */}
        {onGoBack && (
          <div className="text-center">
            <button
              onClick={onGoBack}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Go back to Payment Detail
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutMethod;
