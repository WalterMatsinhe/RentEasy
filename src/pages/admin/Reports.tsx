import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function Reports() {
  const mockStats = [
    { label: 'Total Revenue (This Month)', value: 'KSh 1,245,000', change: '+12%', isPositive: true },
    { label: 'Overall Occupancy', value: '88%', change: '+3%', isPositive: true },
    { label: 'Pending Payments', value: 'KSh 45,000', change: '-5%', isPositive: true },
    { label: 'Active Applications', value: '14', change: '-2%', isPositive: false },
  ]

  const recentReports = [
    { name: 'Monthly Financial Summary - Aug 2026', date: 'Sept 1, 2026', type: 'Finance' },
    { name: 'Occupancy Rate Analysis Q3', date: 'Aug 28, 2026', type: 'Analytics' },
    { name: 'Student Payment Defaulters', date: 'Aug 25, 2026', type: 'Alert' },
  ]

  const revenueData = [
    { name: 'Mar', value: 850000 },
    { name: 'Apr', value: 920000 },
    { name: 'May', value: 1050000 },
    { name: 'Jun', value: 980000 },
    { name: 'Jul', value: 1100000 },
    { name: 'Aug', value: 1245000 },
  ]

  const occupancyData = [
    { name: 'Mar', rate: 75 },
    { name: 'Apr', rate: 78 },
    { name: 'May', rate: 82 },
    { name: 'Jun', rate: 80 },
    { name: 'Jul', rate: 85 },
    { name: 'Aug', rate: 88 },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Generate and view system reports and analytics.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1a3347] transition-colors shadow-sm font-medium">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Growth (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(value) => `KSh ${value/1000}k`} />
                <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="#264559" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Occupancy Rate</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5E642" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E5E642" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(value) => `${value}%`} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="rate" stroke="#264559" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentReports.map((report, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-500">Generated on {report.date}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                {report.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
