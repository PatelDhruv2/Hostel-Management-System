'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfileInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'MALE',
    age: '',
    mobile_number: '',
    address: '',
    emergency_number: '',
    parent_contact: '',
    roll_number: '',
    college_name: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: session?.user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete profile');
      }

      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Complete Your Profile</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Personal Information</legend>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Emergency Contact</label>
              <input type="tel" name="emergency_number" value={formData.emergency_number} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Parent Contact</label>
              <input type="tel" name="parent_contact" value={formData.parent_contact} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <input type="number" name="roll_number" value={formData.roll_number} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>College Name</label>
              <input type="text" name="college_name" value={formData.college_name} onChange={handleChange} required />
            </div>

            <button type="submit">Complete Profile</button>
          </fieldset>
        </form>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          background-color: #f9f9f9;
          padding: 50px 20px;
        }

        .form-box {
          width: 100%;
          max-width: 600px;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .error {
          color: red;
          text-align: center;
          margin-bottom: 10px;
          font-weight: bold;
        }

        fieldset {
          border: none;
          padding: 0;
        }

        legend {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
          color: #555;
        }

        input, select, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        textarea {
          resize: vertical;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
