'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    name: '',
    rollNumber: '',
    college: '',
    mobileNumber: '',
    gender: 'MALE',
    age: '',
    emergencyContact: '',
    parentContact: '',
    parentEmail: ''
  })

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (response.ok) {
        if (formData.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/student/dashboard')
        }
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('An error occurred during registration')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                Register As
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm 
                         bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 
                         focus:border-indigo-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                         rounded-md text-white placeholder-gray-400"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                         rounded-md text-white placeholder-gray-400"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                         rounded-md text-white placeholder-gray-400"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formData.role === 'student' && (
              <>
                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-200">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.rollNumber}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-gray-200">
                    College
                  </label>
                  <input
                    type="text"
                    name="college"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-200">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-200">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white focus:outline-none focus:ring-indigo-500 
                             focus:border-indigo-500"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-200">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-200">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="parentContact" className="block text-sm font-medium text-gray-200">
                    Parent Contact
                  </label>
                  <input
                    type="text"
                    name="parentContact"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.parentContact}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-200">
                    Parent Email
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 
                             rounded-md text-white placeholder-gray-400"
                    value={formData.parentEmail}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                       text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup