// components/SummaryCards.tsx
'use client'

import React from 'react'

export default function SummaryCards({ requests }: { requests: any[] }) {
  const countByStatus = (status: string) =>
    requests.filter((r) => r.status === status).length

  const totalPaid = requests
    .filter((r) => r.payment_status === 'paid')
    .reduce((sum, r) => sum + r.quoted_price, 0)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card title="Total Requests" value={requests.length} />
      <Card title="In Transit" value={countByStatus('in_transit')} />
      <Card title="Delivered" value={countByStatus('delivered')} />
      <Card title="Total Paid (AED)" value={totalPaid.toFixed(2)} />
    </div>
  )
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-slate-100 rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  )
}
