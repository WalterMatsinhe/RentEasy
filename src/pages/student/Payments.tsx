import { mockPayments } from '@/utils/mockData'

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  completed: { bg: 'bg-[#E5E642]/20', text: 'text-[#6b6b00]', dot: 'bg-[#E5E642]' },
  pending: { bg: 'bg-[#264559]/10', text: 'text-[#264559]', dot: 'bg-[#264559]' },
  failed: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
}

export default function StudentPayments() {
  const pendingTotal = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const paidTotal = mockPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your housing rent and invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Amount Due */}
        <div className="relative bg-gradient-to-br from-[#264559] to-[#1a3347] text-white rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Amount Due</p>
            <p className="text-4xl font-bold">KSh {pendingTotal}</p>
            <button
              disabled={pendingTotal === 0}
              className="mt-4 px-5 py-2 bg-[#E5E642] text-[#264559] font-bold rounded-xl text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* Total Paid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E5E642]/20 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#8a8a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Total Paid</p>
            <p className="text-3xl font-bold text-gray-900">KSh {paidTotal}</p>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#264559]/10 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Total Invoices</p>
            <p className="text-3xl font-bold text-gray-900">{mockPayments.length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Payment History</h2>
          <span className="text-xs text-gray-400">{mockPayments.length} invoices</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">No payment history available.</td>
                </tr>
              ) : (
                mockPayments.map((payment) => {
                  const cfg = statusConfig[payment.status] || statusConfig.pending
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-400">{payment.id}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-sm">Monthly Rent</td>
                      <td className="px-6 py-4 font-bold text-gray-900">KSh {payment.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        {payment.status === 'pending' ? (
                          <button className="px-3 py-1.5 bg-[#264559] text-white text-xs font-semibold rounded-lg hover:bg-[#1a3347] transition-colors">Pay</button>
                        ) : (
                          <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">Receipt</button>
                        )}
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
