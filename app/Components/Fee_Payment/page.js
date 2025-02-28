'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function FeePayment() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    semester: '',
    date_of_payment: '',
    Transaction_id: '',
    mode_of_payment: 'UPI', // Default payment mode
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/feepayment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Fee payment details submitted successfully!');
        setFormData({
          semester: '',
          date_of_payment: '',
          Transaction_id: '',
          mode_of_payment: 'UPI',
        });
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to submit fee payment details');
      }
    } catch (error) {
      toast.error('An error occurred while submitting payment details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!session) {
    return <div>Please sign in to submit fee payment details.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Fee Payment Details
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Submit your hostel fee payment information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
              Semester
            </label>
            <input
              type="number"
              id="semester"
              name="semester"
              required
              min="1"
              max="8"
              value={formData.semester}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter semester number (1-8)"
            />
          </div>

          <div>
            <label htmlFor="date_of_payment" className="block text-sm font-medium text-gray-700">
              Payment Date
            </label>
            <input
              type="datetime-local"
              id="date_of_payment"
              name="date_of_payment"
              required
              value={formData.date_of_payment}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="Transaction_id" className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              id="Transaction_id"
              name="Transaction_id"
              required
              value={formData.Transaction_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter transaction ID"
            />
          </div>

          <div>
            <label htmlFor="mode_of_payment" className="block text-sm font-medium text-gray-700">
              Payment Mode
            </label>
            <select
              id="mode_of_payment"
              name="mode_of_payment"
              required
              value={formData.mode_of_payment}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="CASH">Cash</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Payment Details
            </button>
          </div>
        </form>

        {/* Payment Instructions */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Payment Instructions</h3>
          <div className="mt-2 text-sm text-gray-600 space-y-2">
            <p>1. Make the payment using your preferred payment method</p>
            <p>2. Note down the transaction ID from your payment</p>
            <p>3. Fill in the form with accurate payment details</p>
            <p>4. Keep the transaction ID safe for future reference</p>
          </div>
        </div>
      </div>
    </div>
  );
}
