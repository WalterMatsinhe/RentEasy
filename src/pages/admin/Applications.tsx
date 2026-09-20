import { useState } from 'react'
import { useApplications } from '@/context/ApplicationContext'
import { useRooms } from '@/context/RoomContext'
import { useAllocations } from '@/context/AllocationContext'
import { Application } from '@/types'

export default function Applications() {
  const { applications, updateApplicationStatus } = useApplications()
  const { rooms, updateRoom } = useRooms()
  const { allocations, createAllocation } = useAllocations()

  const [allocateModalOpen, setAllocateModalOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')
  const [selectedBedNumber, setSelectedBedNumber] = useState<number | ''>('')

  const openAllocateModal = (app: Application) => {
    setSelectedApp(app)
    setSelectedRoomId('')
    setSelectedBedNumber('')
    setAllocateModalOpen(true)
  }

  const handleApprove = (id: string) => {
    if (window.confirm('Approve this application?')) {
      updateApplicationStatus(id, 'approved')
    }
  }

  const handleReject = (id: string) => {
    if (window.confirm('Reject this application?')) {
      updateApplicationStatus(id, 'rejected')
    }
  }

  // Filter available rooms (capacity > occupiedBeds)
  const availableRooms = rooms.filter(r => r.availableBeds > 0)
  
  const selectedRoom = rooms.find(r => r.id === selectedRoomId)
  
  // Calculate which beds are taken in the selected room
  const takenBeds = allocations
    .filter(a => a.roomId === selectedRoomId && a.status === 'active')
    .map(a => a.bedNumber)
    
  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedApp || !selectedRoomId || selectedBedNumber === '') return

    if (selectedRoom) {
      if (selectedRoom.availableBeds <= 0) {
        alert("This room is full.")
        return
      }

      if (takenBeds.includes(selectedBedNumber)) {
        alert("This bed is already allocated to someone else.")
        return
      }

      // 1. Create Allocation
      createAllocation({
        applicationId: selectedApp.id,
        studentId: selectedApp.studentId,
        roomId: selectedRoomId,
        bedNumber: selectedBedNumber,
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(), // Default to 1 year
      })

      // 2. Increment Room Occupancy
      updateRoom(selectedRoomId, {
        occupiedBeds: selectedRoom.occupiedBeds + 1
      })

      alert('Room successfully allocated!')
      setAllocateModalOpen(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Review and process student room applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Requested Course/Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{app.fullName}</div>
                      <div className="text-xs text-gray-500 mt-1">{app.studentNumber} • {app.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{app.course}</div>
                      <div className="text-xs text-gray-400">Year {app.yearOfStudy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {app.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(app.id)} className="text-green-600 hover:text-green-800 font-medium">Approve</button>
                          <button onClick={() => handleReject(app.id)} className="text-red-600 hover:text-red-800 font-medium">Reject</button>
                        </>
                      )}
                      
                      {app.status === 'approved' && (
                        <button 
                          onClick={() => openAllocateModal(app)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                        >
                          Allocate Room
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocation Modal */}
      {allocateModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Allocate Room</h2>
              <button onClick={() => setAllocateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleAllocate} className="p-6 space-y-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Allocating for:</p>
                <p className="font-medium text-gray-900">{selectedApp.fullName} ({selectedApp.studentNumber})</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Room</label>
                <select 
                  required 
                  value={selectedRoomId} 
                  onChange={e => {
                    setSelectedRoomId(e.target.value)
                    setSelectedBedNumber('')
                  }} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>-- Select a room with available beds --</option>
                  {availableRooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.title} (Block {room.block}, No. {room.roomNumber}) - {room.availableBeds} beds left
                    </option>
                  ))}
                </select>
                {availableRooms.length === 0 && <p className="text-sm text-red-500 mt-1">No rooms available. Please add more rooms.</p>}
              </div>

              {selectedRoom && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Bed Number</label>
                  <select 
                    required 
                    value={selectedBedNumber} 
                    onChange={e => setSelectedBedNumber(Number(e.target.value))} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>-- Choose a bed --</option>
                    {Array.from({ length: selectedRoom.capacity }, (_, i) => i + 1).map(bed => {
                      const isTaken = takenBeds.includes(bed)
                      return (
                        <option key={bed} value={bed} disabled={isTaken}>
                          Bed {bed} {isTaken ? '(Occupied)' : '(Available)'}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setAllocateModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!selectedRoomId || selectedBedNumber === ''} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  Allocate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
