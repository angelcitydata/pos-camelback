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
    <div className="flex flex-col h-full p-6 bg-white rounded-2xl">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <h2 className="px-1 pb-1 text-base font-semibold tracking-wide uppercase text-slate-900">
          Checkout Method
        </h2>

        <p className="px-1 mb-6 text-sm text-slate-500">
          Choose how you'd like to collect this payment and where to send the
          checkout.
        </p>

        {/* Card Present / Not Present */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => setCardPresent(true)}
            className={`p-4 rounded-lg border-2 transition-colors text-left hover:cursor-pointer ${
              cardPresent === true
                ? "border-pink-500 bg-pink-50"
                : "border-slate-300 bg-white hover:border-slate-400"
            }`}
          >
            <div className="mb-1 text-sm font-semibold text-slate-900">
              Card Present
            </div>
            <div className="text-xs text-slate-500">
              Use a physical card with your terminal.
            </div>
          </button>

          <button
            onClick={() => setCardPresent(false)}
            className={`p-4 rounded-lg border-2 transition-colors text-left hover:cursor-pointer ${
              cardPresent === false
                ? "border-pink-500 bg-pink-50"
                : "border-slate-300 bg-white hover:border-slate-400"
            }`}
          >
            <div className="mb-1 text-sm font-semibold text-slate-900">
              Card Not Present
            </div>
            <div className="text-xs text-slate-500">
              Key in card details, send a link, or choose a stored payment
              method
            </div>
          </button>
        </div>

        {/* Where should checkout happen */}
        {cardPresent === false && (
          <div className="mb-5">
            <p className="mb-2 text-sm font-medium text-slate-600">
              Where should this checkout happen?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setKeepLocal(false)}
                className={`p-4 rounded-lg border-2 transition-colors text-left hover:cursor-pointer ${
                  keepLocal === false
                    ? "border-pink-500 bg-pink-50"
                    : "border-slate-300 bg-white hover:border-slate-400"
                }`}
              >
                <div className="mb-1 text-sm font-semibold text-slate-900">
                  Send to Customer
                </div>
                <div className="text-xs text-slate-500">
                  Email or text a secure payment
                </div>
              </button>

              <button
                onClick={() => setKeepLocal(true)}
                className={`p-4 rounded-lg border-2 transition-colors text-left hover:cursor-pointer ${
                  keepLocal === true
                    ? "border-pink-500 bg-pink-50"
                    : "border-slate-300 bg-white hover:border-slate-400"
                }`}
              >
                <div className="mb-1 text-sm font-semibold text-slate-900">
                  Keep Local
                </div>
                <div className="text-xs text-slate-500">
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
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                To use a stored payment, select one of these.
              </p>

              <div className="overflow-hidden border rounded-lg border-slate-200">
                <table className="w-full text-sm">
                  <thead className="border-b bg-slate-50 border-slate-200">
                    <tr>
                      <th className="px-3 py-2 font-semibold text-left text-slate-600">
                        Type
                      </th>
                      <th className="px-3 py-2 font-semibold text-left text-slate-600">
                        Brand
                      </th>
                      <th className="px-3 py-2 font-semibold text-left text-slate-600">
                        Last 4
                      </th>
                      <th
                        className="px-3 py-2 font-semibold text-left text-slate-600"
                        colSpan="2"
                      >
                        Expires
                      </th>
                      <th className="w-10 px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {storedPaymentMethods.map((method, index) => (
                      <tr
                        key={index}
                        className={`border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors ${
                          selectedPaymentMethod === index
                            ? "bg-pink-50"
                            : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedPaymentMethod(index)}
                      >
                        <td className="px-3 py-2 text-slate-700">
                          {method.type || ""}
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {method.card?.brand || ""}
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {method.card?.last4 || ""}
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {method.card?.exp_month || ""}
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {method.card?.exp_year || ""}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedPaymentMethod === index}
                            onChange={() => setSelectedPaymentMethod(index)}
                            className="w-4 h-4 accent-pink-500"
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
      <div className="pt-4 mt-4 space-y-3 border-t border-slate-200">
        <button
          onClick={handleProcess}
          className="w-full p-4 text-base font-extrabold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 rounded-lg hover:bg-green-700 hover:border-green-700 hover:cursor-pointer active:bg-green-800"
        >
          Process
        </button>

        {onGoBack && (
          <div className="text-center">
            <button
              onClick={onGoBack}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 hover:cursor-pointer"
            >
              ← Back to Payment Detail
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutMethod;
