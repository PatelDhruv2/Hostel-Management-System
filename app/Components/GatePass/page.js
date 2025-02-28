'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function GatePass() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    reason: '',
    leave_date: '',
    arrival_date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/gatepass/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Gate pass request submitted successfully!');
        setFormData({ reason: '', leave_date: '', arrival_date: '' }); // Reset form
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to submit gate pass request');
      }
    } catch (error) {
      toast.error('An error occurred while submitting gate pass request');
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
    return <div>Please sign in to submit gate pass request.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Gate Pass Request
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Submit your gate pass request for approval
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Leave
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Please provide a detailed reason for your leave"
            />
          </div>

          <div>
            <label htmlFor="leave_date" className="block text-sm font-medium text-gray-700">
              Leave Date & Time
            </label>
            <input
              type="datetime-local"
              id="leave_date"
              name="leave_date"
              required
              value={formData.leave_date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="arrival_date" className="block text-sm font-medium text-gray-700">
              Expected Arrival Date & Time
            </label>
            <input
              type="datetime-local"
              id="arrival_date"
              name="arrival_date"
              required
              value={formData.arrival_date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Gate Pass Request
            </button>
          </div>
        </form>

        {/* Status section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Request Status</h3>
          <p className="mt-2 text-sm text-gray-600">
            Your request will be reviewed by the hostel administration.
            Initial status will be "PENDING".
          </p>
        </div>
      </div>
    </div>
  );
}
