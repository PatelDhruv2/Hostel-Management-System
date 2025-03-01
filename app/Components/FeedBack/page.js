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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!session) {
    return <div>Please sign in to submit feedback.</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Submit Feedback</h2>
          <p style={styles.subtitle}>Let us know about your concerns or suggestions</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="room_number" style={styles.label}>Room Number</label>
            <input
              type="text"
              id="room_number"
              name="room_number"
              required
              value={formData.room_number}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your room number"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="issue" style={styles.label}>Issue Description</label>
            <textarea
              id="issue"
              name="issue"
              required
              rows={4}
              value={formData.issue}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Describe your issue or suggestion"
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Feedback
          </button>
        </form>
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
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '16px',
  },
};
