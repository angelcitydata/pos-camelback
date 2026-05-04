import React, { useState } from 'react';

const PaymentDetail = ({ orderInfo, onDone, backToOrder }) => {
  // Helper function to convert date from YYYY-MM-DD to MM/DD/YYYY
  const formatDateToUS = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Helper function to convert date from MM/DD/YYYY to YYYY-MM-DD for input
  const formatDateToISO = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString; // Already in ISO format
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const todayISO = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

  const [formData, setFormData] = useState({
    paymentDate: formatDateToISO(orderInfo?.paymentDate) || todayISO,
    customer: orderInfo?.customer || "",
    idPayment: orderInfo?.idPayment || "",
    paymentMethod: orderInfo?.paymentMethod || "",
    paymentNumber: orderInfo?.paymentNumber || "",
    amount: orderInfo?.amount || "",
    date: formatDateToISO(orderInfo?.date) || todayISO,
    notes: orderInfo?.notes || "",
  });

  const paymentMethods = [
    "Cash",
    "Check",
    "Credit Card",
    "Donation",
    "Gift Card",
    "House Account",
    "Replacement",
    "Subscriptions",
    "Not Paid",
    "Wire In",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Convert dates to MM/DD/YYYY format before sending
    const formattedData = {
      ...formData,
      paymentDate: formatDateToUS(formData.paymentDate),
      date: formatDateToUS(formData.date),
    };
    onDone(formattedData);
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-2xl">
      <h2 className="px-1 pb-4 text-base font-semibold tracking-wide uppercase text-slate-900">
        Payment Detail
      </h2>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
        <div className="grid grid-cols-[160px_1fr] gap-3 items-center">
          <label className="text-sm font-medium text-slate-600">
            Payment Date
          </label>
          <input
            type="date"
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            value={formData.paymentDate}
            onChange={(e) => handleChange("paymentDate", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-3 items-center">
          <label className="text-sm font-medium text-slate-600">Customer</label>
          <input
            type="text"
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            value={formData.customer}
            onChange={(e) => handleChange("customer", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-3 items-center">
          <label className="text-sm font-medium text-slate-600">
            Payment Method
          </label>
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%2364748b%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3e%3c/svg%3e')] bg-size-[1.5em_1.5em] bg-position-[right_0.5rem_center] bg-no-repeat pr-10 cursor-pointer"
            value={formData.paymentMethod}
            onChange={(e) => handleChange("paymentMethod", e.target.value)}
          >
            <option value="">Select payment method...</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-3 items-center">
          <label className="text-sm font-medium text-slate-600">
            Payment Number
          </label>
          <input
            type="text"
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            value={formData.paymentNumber}
            onChange={(e) => handleChange("paymentNumber", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-3 items-center">
          <label className="text-sm font-medium text-slate-600">Amount</label>
          <input
            type="text"
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-3 items-center">
          <label className="text-sm font-medium text-slate-600">Date</label>
          <input
            type="date"
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-3 items-start">
          <label className="text-sm font-medium text-slate-600 pt-2">
            Notes
          </label>
          <textarea
            className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-200 space-y-3">
        <button
          onClick={handleSubmit}
          className="w-full p-4 text-base font-extrabold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 rounded-lg hover:bg-green-700 hover:border-green-700 hover:cursor-pointer active:bg-green-800"
        >
          {formData.paymentMethod &&
          formData.paymentMethod.toLowerCase().includes("credit")
            ? "Proceed to Checkout"
            : "Done"}
        </button>
        <div className="text-center">
          <button
            onClick={backToOrder}
            className="text-sm font-medium text-slate-500 hover:text-slate-700 hover:cursor-pointer"
          >
            ← Back to Order
          </button>
        </div>
      </div>
    </div>
  );
};;

export default PaymentDetail;
