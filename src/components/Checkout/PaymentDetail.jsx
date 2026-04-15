import React, { useState } from 'react';

const PaymentDetail = ({ orderInfo, onDone, backToOrder }) => {
  // Helper function to convert date from YYYY-MM-DD to MM/DD/YYYY
  const formatDateToUS = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Helper function to convert date from MM/DD/YYYY to YYYY-MM-DD for input
  const formatDateToISO = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('-')) return dateString; // Already in ISO format
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const [formData, setFormData] = useState({
    paymentDate: formatDateToISO(orderInfo?.paymentDate) || "",
    customer: orderInfo?.customer || "",
    idPayment: orderInfo?.idPayment || "",
    paymentMethod: orderInfo?.paymentMethod || "",
    paymentNumber: orderInfo?.paymentNumber || "",
    amount: orderInfo?.amount || "",
    date: formatDateToISO(orderInfo?.date) || "",
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Convert dates to MM/DD/YYYY format before sending
    const formattedData = {
      ...formData,
      paymentDate: formatDateToUS(formData.paymentDate),
      date: formatDateToUS(formData.date)
    };
    onDone(formattedData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm min-h-200">
      <h1 className="text-3xl font-bold text-center mb-4">Payment Detail</h1>

      <div className="space-y-4">
        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <label className="text-gray-600 text-lg">Payment Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded px-4 py-3 bg-white"
            value={formData.paymentDate}
            onChange={(e) => handleChange("paymentDate", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <label className="text-gray-600 text-lg">Customer</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-3 bg-white"
            value={formData.customer}
            onChange={(e) => handleChange("customer", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <label className="text-gray-600 text-lg">Payment Method</label>
          <select
            className="border border-gray-300 rounded px-4 py-3 bg-white cursor-pointer text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3e%3c/svg%3e')] bg-size-[1.5em_1.5em] bg-position-[right_0.5rem_center] bg-no-repeat pr-10"
            value={formData.paymentMethod}
            onChange={(e) => handleChange("paymentMethod", e.target.value)}
          >
            <option value="" className="text-gray-400">
              Select payment method...
            </option>
            {paymentMethods.map((method) => (
              <option key={method} value={method} className="text-gray-900">
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <label className="text-gray-600 text-lg">Payment Number</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-3 bg-white"
            value={formData.paymentNumber}
            onChange={(e) => handleChange("paymentNumber", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <label className="text-gray-600 text-lg">Amount</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-3 bg-white"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
          <label className="text-gray-600 text-lg">Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded px-4 py-3 bg-white"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
          <label className="text-gray-600 text-lg">Notes</label>
          <textarea
            className="border border-gray-300 rounded px-4 py-3 bg-white h-48 resize-none"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-20 py-4 rounded text-xl"
        >
          {formData.paymentMethod &&
          formData.paymentMethod.toLowerCase().includes("credit")
            ? "Proceed to Checkout"
            : "Done"}
        </button>
      </div>
      <div className=" pt-3 text-center">
        <button
          onClick={backToOrder}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Go back to Order
        </button>
      </div>
    </div>
  );
};

export default PaymentDetail;
