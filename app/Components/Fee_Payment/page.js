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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!session) {
    return <div>Please sign in to submit fee payment details.</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Fee Payment Details</h2>
          <p style={styles.subtitle}>Submit your hostel fee payment information</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="semester" style={styles.label}>Semester</label>
            <input
              type="number"
              id="semester"
              name="semester"
              required
              min="1"
              max="8"
              value={formData.semester}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter semester number (1-8)"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="date_of_payment" style={styles.label}>Payment Date</label>
            <input
              type="datetime-local"
              id="date_of_payment"
              name="date_of_payment"
              required
              value={formData.date_of_payment}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Transaction_id" style={styles.label}>Transaction ID</label>
            <input
              type="text"
              id="Transaction_id"
              name="Transaction_id"
              required
              value={formData.Transaction_id}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter transaction ID"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="mode_of_payment" style={styles.label}>Payment Mode</label>
            <select
              id="mode_of_payment"
              name="mode_of_payment"
              required
              value={formData.mode_of_payment}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="CASH">Cash</option>
            </select>
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Payment Details
          </button>
        </form>

        <div style={styles.instructions}>
          <h3 style={styles.instructionTitle}>Payment Instructions</h3>
          <ul style={styles.instructionList}>
            <li>1. Make the payment using your preferred payment method</li>
            <li>2. Note down the transaction ID from your payment</li>
            <li>3. Fill in the form with accurate payment details</li>
            <li>4. Keep the transaction ID safe for future reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
    color: '#4b5563',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '16px',
  },
  instructions: {
    marginTop: '32px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },
  instructionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#111827',
  },
  instructionList: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.5',
    paddingLeft: '16px',
  },
};
