'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        const userResponse = await fetch('/api/auth/session');
        const userData = await userResponse.json();

        if (userData.user.isAdmin) {
          router.push('/admindashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      setError('An error occurred during sign in');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign in to your account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.inputGroup}>
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}
            />
          </div>
          <button type="submit" style={styles.button}>Sign in</button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{' '}
          <Link href="/api/Signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '32px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    fontSize: '14px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    color: '#374151',
    outline: 'none',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '16px',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
  },
};
