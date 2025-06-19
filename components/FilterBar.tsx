// components/FilterBar.tsx
'use client'

export default function FilterBar({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: {
  statusFilter: string
  onStatusChange: (val: string) => void
  searchQuery: string
  onSearchChange: (val: string) => void
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <select
        className="border rounded px-3 py-2 text-sm"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
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
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
