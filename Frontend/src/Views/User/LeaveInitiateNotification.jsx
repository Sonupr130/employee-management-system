import { useState } from "react"

export default function LeaveInitiateNotification() {
  const [showReason, setShowReason] = useState(false)
  const [reason, setReason] = useState("")

  const handleDecline = () => {
    setShowReason(true)
  }

  const handleApprove = () => {
    // Handle approve action
    console.log("Approved")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 text-xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h1>Leave Recall</h1>
          </div>

          {/* Notice Box */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-2">Dear User,</p>
            <p className="text-gray-700">
              This is to inform you that you have been RECALLED from your CASUAL Leave by your line manager named
              DOYINSOLA ODUNSI for an urgent meeting and task to be completed in the office before 2nd June, 2022.
            </p>
          </div>

          {/* Reason Input */}
          {showReason && (
            <div className="space-y-2">
              <label htmlFor="reason" className="block text-sm text-gray-700">
                If No, state reason why ?
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="State your reason..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleApprove}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

