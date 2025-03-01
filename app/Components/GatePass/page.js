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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!session) {
    return <div>Please sign in to submit gate pass request.</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Gate Pass Request</h2>
          <p style={styles.subtitle}>
            Submit your gate pass request for approval
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="reason" style={styles.label}>
              Reason for Leave
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Please provide a detailed reason for your leave"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="leave_date" style={styles.label}>
              Leave Date & Time
            </label>
            <input
              type="datetime-local"
              id="leave_date"
              name="leave_date"
              required
              value={formData.leave_date}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="arrival_date" style={styles.label}>
              Expected Arrival Date & Time
            </label>
            <input
              type="datetime-local"
              id="arrival_date"
              name="arrival_date"
              required
              value={formData.arrival_date}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Gate Pass Request
          </button>
        </form>

        {/* Status Section */}
        <div style={styles.statusSection}>
          <h3 style={styles.statusTitle}>Request Status</h3>
          <p style={styles.statusText}>
            Your request will be reviewed by the hostel administration. Initial status will be <strong>PENDING</strong>.
          </p>
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
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  textarea: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    transition: 'border-color 0.2s',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '16px',
  },
  statusSection: {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },
  statusTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
  },
  statusText: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '8px',
  },
};
