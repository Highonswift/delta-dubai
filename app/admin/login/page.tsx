'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [forgot, setForgot] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin/deliveries')
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/admin/reset-password',
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Password reset email sent. Check your inbox.')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={forgot ? handleForgot : handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {forgot ? 'Reset Password' : 'Admin Login'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        {!forgot && (
          <>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 mb-6 rounded"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {forgot ? 'Send Reset Link' : 'Login'}
        </button>

        <button
          type="button"
          onClick={() => {
            setForgot(!forgot)
            setError('')
            setMessage('')
          }}
          className="text-sm text-blue-600 mt-4 underline"
        >
          {forgot ? 'Back to login' : 'Forgot password?'}
        </button>
      </form>
    </div>
  )
}
