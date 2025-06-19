'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DeliveryDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [delivery, setDelivery] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
    })
  }, [router])

  useEffect(() => {
    const fetchDelivery = async () => {
      const { data, error } = await supabase
        .from('delivery_requests')
        .select('*')
        .eq('id', id)
        .single()

      if (error) setError(error.message)
      else setDelivery(data)
      setLoading(false)
    }

    if (id) fetchDelivery()
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>
  if (!delivery) return <div className="p-6">Delivery not found.</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Delivery Details</h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-4 border">
        <div>
          <span className="font-semibold">Customer:</span> {delivery.customer_name}
        </div>
        <div>
          <span className="font-semibold">Car Model:</span> {delivery.car_model}
        </div>
        <div>
          <span className="font-semibold">Pickup:</span> {delivery.pickup_location}
        </div>
        <div>
          <span className="font-semibold">Drop-off:</span> {delivery.dropoff_location}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {delivery.status}
        </div>
        <div>
          <span className="font-semibold">Quoted Price:</span> AED {delivery.quoted_price}
        </div>
        <div>
          <span className="font-semibold">Payment Status:</span> {delivery.payment_status}
        </div>
        <div>
          <span className="font-semibold">Requested At:</span> {new Date(delivery.created_at).toLocaleString()}
        </div>
        {delivery.notes && (
          <div>
            <span className="font-semibold">Notes:</span> {delivery.notes}
          </div>
        )}
      </div>
    </div>
  )
}
