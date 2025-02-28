'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.isAdmin) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <p>Welcome, {session.user.email}</p>
                
                {/* Admin Features */}
                <div className="mt-8 grid grid-cols-1 gap-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Manage Students
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    View Feedback
                  </button>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded">
                    Manage Rooms
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                    View Gate Pass Requests
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}