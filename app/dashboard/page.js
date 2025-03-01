'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AppSidebar from '../Components/Sidebar/page';

export default function Dashboard() {
  const { data: session } = useSession();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('/api/student/profile', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchStudentData();
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view the dashboard.</div>;
  }

  return (
    <div style={styles.container}>
      <AppSidebar />
      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          <div style={styles.card}>
            <h1 style={styles.heading}>
              Hi, {studentData?.name || session.user.email}! 👋
            </h1>
            <p style={styles.subtext}>
              Welcome to your student dashboard
            </p>
          </div>

          {/* Dashboard cards section */}
          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <h2 style={styles.cardHeading}>Room Status</h2>
              <p style={styles.cardText}>Your room information and status</p>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardHeading}>Fee Status</h2>
              <p style={styles.cardText}>View your fee payment status</p>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardHeading}>Gate Passes</h2>
              <p style={styles.cardText}>Manage your gate pass requests</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    padding: '32px',
    marginLeft: '240px', // Adjust this based on your actual sidebar width
  },
  contentWrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '24px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px',
  },
  subtext: {
    color: '#6b7280',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '24px',
  },
  cardHeading: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
  },
  cardText: {
    color: '#6b7280',
  },
};
