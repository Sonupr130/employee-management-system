import { PencilIcon } from 'lucide-react'
import React from 'react'

const EmployeeProfile = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-md">
      <div className="relative">
        <div className="absolute right-0 top-0">
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Edit profile"
          >
            <PencilIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-yellow-400 overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-60twXVMoGJKDG5ZJaUWkiL9QiAF2wv.png"
              alt="Employee avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 w-full">
            <div className="space-y-1">
              <p className="text-gray-600 text-sm">Employee Name</p>
              <h1 className="text-xl font-semibold">John Doe Francis</h1>
            </div>

            <div className="space-y-1">
              <p className="text-gray-600 text-sm">Department</p>
              <p className="text-lg font-medium">Design & Marketing</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Job Title</p>
                <p className="text-lg font-medium">UI / UX Designer</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Job Category</p>
                <p className="text-lg font-medium">Full time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmployeeProfile