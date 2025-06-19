'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type DeliveryRequest = {
  id: string
  customer_name: string
  contact: string
  car_model: string
  pickup_location: string
  dropoff_location: string
  status: string
  quoted_price: number
  created_at: string
}

export default function AdminDeliveries() {
  const [requests, setRequests] = useState<DeliveryRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  // ✅ Session check — only allow logged-in users
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  // ✅ Fetch delivery requests
  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('delivery_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        setError('Failed to load delivery requests')
      } else {
        setRequests(data as DeliveryRequest[])
      }

      setLoading(false)
    }

    fetchRequests()
  }, [])

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      scheduled: 'bg-blue-500',
      in_transit: 'bg-orange-500',
      delivered: 'bg-green-600',
      cancelled: 'bg-red-500',
    }

    return (
      <span
        className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ${
          colors[status] || 'bg-gray-400'
        }`}
      >
        {status.replace(/_/g, ' ')}
      </span>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin • Delivery Requests</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Car</th>
                <th className="px-4 py-3 text-left">From → To</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Requested At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{req.customer_name}</td>
                  <td className="px-4 py-3">{req.car_model}</td>
                  <td className="px-4 py-3">
                    {req.pickup_location} → {req.dropoff_location}
                  </td>
                  <td className="px-4 py-3 font-semibold">AED {req.quoted_price}</td>
                  <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {new Date(req.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    No delivery requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
