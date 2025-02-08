'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const StudentDashboard = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (!userData) {
      router.push('/login')
    } else {
      setUser(userData)
    }
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">
            Hi, {user.name}! 👋
          </h1>
          <p className="text-gray-300">
            Welcome to your student dashboard
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard 