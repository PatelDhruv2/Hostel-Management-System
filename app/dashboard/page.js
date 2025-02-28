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
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 p-8 ml-[240px]"> {/* Adjust ml-[240px] based on your sidebar width */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Hi, {studentData?.name || session.user.email}! 👋
            </h1>
            <p className="text-gray-600">
              Welcome to your student dashboard
            </p>
          </div>

          {/* Add more dashboard content here */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example dashboard cards */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Room Status</h2>
              <p className="text-gray-600">Your room information and status</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Fee Status</h2>
              <p className="text-gray-600">View your fee payment status</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Gate Passes</h2>
              <p className="text-gray-600">Manage your gate pass requests</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}