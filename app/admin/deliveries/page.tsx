'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function AdminDeliveries() {
  const router = useRouter()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
    })
  }, [router])

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('delivery_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) setError(error.message)
      else setRequests(data || [])

      setLoading(false)
    }

    fetchRequests()
  }, [])

  const filtered = requests.filter((r) => {
    const matchStatus = statusFilter ? r.status === statusFilter : true
    const matchQuery = `${r.customer_name} ${r.car_model}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchStatus && matchQuery
  })

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { color: 'from-yellow-400 to-yellow-600', label: 'Pending' },
      scheduled: { color: 'from-blue-400 to-blue-600', label: 'Scheduled' },
      in_transit: { color: 'from-orange-400 to-orange-600', label: 'In Transit' },
      delivered: { color: 'from-green-400 to-green-600', label: 'Delivered' },
      cancelled: { color: 'from-red-400 to-red-600', label: 'Cancelled' },
    }[status] || { color: 'from-gray-400 to-gray-500', label: status }

    return (
      <span
        className={`inline-block text-xs font-semibold text-white px-2 py-1 rounded-full bg-gradient-to-r ${config.color} shadow`}
      >
        {config.label}
      </span>
    )
  }

  const SummaryCards = ({ requests }: { requests: any[] }) => {
    const countByStatus = (status: string) =>
      requests.filter((r) => r.status === status).length

    const totalPaid = requests
      .filter((r) => r.payment_status === 'paid')
      .reduce((sum, r) => sum + r.quoted_price, 0)

    const Card = ({ title, value }: { title: string; value: string | number }) => (
      <div className="bg-gradient-to-br from-white via-gray-50 to-slate-100 rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-semibold text-gray-800 mt-1">{value}</p>
      </div>
    )

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Requests" value={requests.length} />
        <Card title="In Transit" value={countByStatus('in_transit')} />
        <Card title="Delivered" value={countByStatus('delivered')} />
        <Card title="Total Paid (AED)" value={totalPaid.toFixed(2)} />
      </div>
    )
  }

  const handleViewDetails = (id: string) => {
    router.push(`/admin/deliveries/${id}`)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin • Delivery Requests</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <SummaryCards requests={requests} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="text"
            placeholder="Search by name or car"
            className="border px-3 py-2 rounded text-sm w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No deliveries found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-slate-200 backdrop-blur-sm bg-white/70">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-600 uppercase bg-slate-100">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Requested</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filtered.map((r, i) => (
                  <tr key={r.id} className={`hover:bg-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-4 py-3">{r.customer_name}</td>
                    <td className="px-4 py-3">{r.car_model}</td>
                    <td className="px-4 py-3">{r.pickup_location} → {r.dropoff_location}</td>
                    <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
                    <td className="px-4 py-3">AED {r.quoted_price}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleViewDetails(r.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
