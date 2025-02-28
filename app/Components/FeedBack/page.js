'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function FeedBack() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    issue: '',
    room_number: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Feedback submitted successfully!');
        setFormData({ issue: '', room_number: '' }); // Reset form
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to submit feedback');
      }
    } catch (error) {
      toast.error('An error occurred while submitting feedback');
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
    return <div>Please sign in to submit feedback.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Submit Feedback
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Let us know about your concerns or suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="room_number" className="block text-sm font-medium text-gray-700">
              Room Number
            </label>
            <input
              type="text"
              id="room_number"
              name="room_number"
              required
              value={formData.room_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your room number"
            />
          </div>

          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
              Issue Description
            </label>
            <textarea
              id="issue"
              name="issue"
              required
              rows={4}
              value={formData.issue}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe your issue or suggestion"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
