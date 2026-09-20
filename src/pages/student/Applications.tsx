import { mockApplications, mockRooms } from '@/utils/mockData'
import { Link } from 'react-router-dom'

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  approved: { bg: 'bg-[#E5E642]/20', text: 'text-[#6b6b00]', dot: 'bg-[#E5E642]' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
  pending: { bg: 'bg-[#264559]/10', text: 'text-[#264559]', dot: 'bg-[#264559]' },
}

export default function StudentApplications() {
  const approved = mockApplications.filter(a => a.status === 'approved').length
  const pending = mockApplications.filter(a => a.status === 'pending').length
  const rejected = mockApplications.filter(a => a.status === 'rejected').length

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-500 mt-1 text-sm">Track all your room applications and their status</p>
        </div>
        <Link
          to="/student/rooms"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#264559] text-white font-semibold rounded-xl hover:bg-[#1a3347] transition-colors text-sm shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Application
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#E5E642]/10 border border-[#E5E642]/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E5E642] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><p className="text-2xl font-bold text-gray-900">{approved}</p><p className="text-xs text-gray-500">Approved</p></div>
        </div>
        <div className="bg-[#264559]/5 border border-[#264559]/10 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#264559] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><p className="text-2xl font-bold text-gray-900">{pending}</p><p className="text-xs text-gray-500">Pending</p></div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><p className="text-2xl font-bold text-gray-900">{rejected}</p><p className="text-xs text-gray-500">Rejected</p></div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Application History</h2>
          <span className="text-xs text-gray-400">{mockApplications.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockApplications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                    You have not submitted any applications yet.
                  </td>
                </tr>
              ) : (
                mockApplications.map((app) => {
                  const room = mockRooms.find(r => r.id === app.roomId)
                  const cfg = statusConfig[app.status] || statusConfig.pending
                  return (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 text-sm">{room?.title || 'Unknown Room'}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Room {room?.roomNumber} · Block {room?.block}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(app.appliedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {app.additionalInfo || '—'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
