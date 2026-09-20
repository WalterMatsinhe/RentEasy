import { mockNotifications } from '@/utils/mockData'
import { useState } from 'react'

const typeIcons: Record<string, string> = {
  application: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  payment: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  allocation: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  general: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
}

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unread = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1 text-sm">Stay updated with your housing status</p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#264559] bg-[#264559]/10 hover:bg-[#264559]/20 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Mark all as read
          </button>
        )}
      </div>

      {/* Unread Count Badge */}
      {unread > 0 && (
        <div className="mb-5 flex items-center gap-3 bg-[#264559]/5 border border-[#264559]/10 rounded-xl px-4 py-3">
          <span className="w-6 h-6 bg-[#264559] text-[#E5E642] text-xs font-bold rounded-full flex items-center justify-center shrink-0">{unread}</span>
          <p className="text-sm text-[#264559] font-medium">You have {unread} unread notification{unread > 1 ? 's' : ''}</p>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <p className="text-gray-400 text-sm">You have no notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((notification, idx) => {
              const iconPath = typeIcons[notification.type] || typeIcons.general
              return (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-5 transition-colors ${notification.isRead ? 'bg-white' : 'bg-[#264559]/5'}`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${notification.isRead ? 'bg-gray-100' : idx % 2 === 0 ? 'bg-[#264559]' : 'bg-[#E5E642]'}`}>
                    <svg className={`w-5 h-5 ${notification.isRead ? 'text-gray-400' : idx % 2 === 0 ? 'text-white' : 'text-[#264559]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className={`font-semibold text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                        {new Date(notification.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${notification.isRead ? 'text-gray-400' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-2 text-xs font-semibold text-[#264559] hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>

                  {/* Unread dot */}
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-[#E5E642] mt-2 shrink-0 animate-pulse" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
