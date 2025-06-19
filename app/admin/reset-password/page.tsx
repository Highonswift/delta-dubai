'use client'

import { useEffect, useState } from 'react'
import {  useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // This triggers Supabase to exchange the token in the URL for a session
    supabase.auth.getSession()
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Password updated. Redirecting to login...')
      setTimeout(() => router.push('/admin/login'), 2000)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

        <label className="block text-sm mb-1">New Password</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 mb-6 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Set New Password
        </button>
      </form>
    </div>
  )
}
