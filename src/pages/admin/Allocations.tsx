import { useAllocations } from '@/context/AllocationContext'
import { useRooms } from '@/context/RoomContext'
import { useApplications } from '@/context/ApplicationContext'
import { Allocation } from '@/types'

export default function Allocations() {
  const { allocations, updateAllocationStatus } = useAllocations()
  const { rooms, updateRoom } = useRooms()
  const { applications } = useApplications()

  const handleStatusChange = (allocation: Allocation, newStatus: Allocation['status']) => {
    // If moving from 'active' to 'completed' or 'cancelled', we should decrement the room's occupiedBeds
    const room = rooms.find(r => r.id === allocation.roomId)
    if (allocation.status === 'active' && newStatus !== 'active' && room) {
      updateRoom(room.id, { occupiedBeds: Math.max(0, room.occupiedBeds - 1) })
    } 
    // If moving from inactive back to active
    else if (allocation.status !== 'active' && newStatus === 'active' && room) {
      if (room.availableBeds <= 0) {
        alert("Cannot reactivate: Room is already full.")
        return
      }
      updateRoom(room.id, { occupiedBeds: room.occupiedBeds + 1 })
    }

    updateAllocationStatus(allocation.id, newStatus)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Allocations</h1>
          <p className="text-gray-500 text-sm mt-1">Manage active and past room allocations.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Room & Bed</th>
                <th className="px-6 py-4">Allocation Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allocations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No allocations found.
                  </td>
                </tr>
              ) : (
                allocations.map(alloc => {
                  const room = rooms.find(r => r.id === alloc.roomId)
                  const app = applications.find(a => a.id === alloc.applicationId)
                  
                  return (
                    <tr key={alloc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{app?.fullName || 'Unknown Student'}</div>
                        <div className="text-xs text-gray-500 mt-1">{app?.studentNumber || alloc.studentId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{room?.title || 'Unknown Room'}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Block {room?.block} • No. {room?.roomNumber} • Bed {alloc.bedNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(alloc.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alloc.status === 'active' ? 'bg-green-100 text-green-700' :
                          alloc.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {alloc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select 
                          value={alloc.status}
                          onChange={(e) => handleStatusChange(alloc, e.target.value as Allocation['status'])}
                          className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
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
