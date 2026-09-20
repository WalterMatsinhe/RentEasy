import React, { useState } from 'react'
import { useRooms } from '@/context/RoomContext'
import { Room } from '@/types'

export default function Rooms() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useRooms()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    district: '',
    city: 'Adana',
    price: 0,
    capacity: 1,
    bathrooms: 1,
    occupiedBeds: 0,
    type: 'single' as Room['type'],
    roomNumber: '',
    block: '',
    facilities: '',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
  })

  const openAddModal = () => {
    setEditingRoom(null)
    setFormData({
      title: '', district: '', city: 'Adana', price: 0, capacity: 1, bathrooms: 1, occupiedBeds: 0,
      type: 'single', roomNumber: '', block: '', facilities: '', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
    })
    setIsModalOpen(true)
  }

  const openEditModal = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      title: room.title,
      district: room.district,
      city: room.city,
      price: room.price,
      capacity: room.capacity,
      bathrooms: room.bathrooms,
      occupiedBeds: room.occupiedBeds,
      type: room.type,
      roomNumber: room.roomNumber,
      block: room.block,
      facilities: room.facilities.join(', '),
      image: room.image
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const facilitiesArray = formData.facilities.split(',').map(f => f.trim()).filter(Boolean)
    
    // Validate occupied vs capacity
    if (formData.occupiedBeds > formData.capacity) {
      alert("Occupied beds cannot exceed room capacity.")
      return
    }

    if (editingRoom) {
      updateRoom(editingRoom.id, {
        ...formData,
        facilities: facilitiesArray
      })
    } else {
      addRoom({
        ...formData,
        facilities: facilitiesArray
      })
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteRoom(id)
    }
  }

  const getStatusBadge = (status: Room['availabilityStatus']) => {
    switch(status) {
      case 'available': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Available</span>
      case 'partially_occupied': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Partially Occupied</span>
      case 'full': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Full</span>
      case 'maintenance': return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Maintenance</span>
      default: return null
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rooms Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage hostel rooms, capacities, and status.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1a3347] transition-colors shadow-sm font-medium"
        >
          + Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Room Details</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rooms.map(room => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{room.title}</div>
                    <div className="text-xs text-gray-500 mt-1">Block {room.block} - No. {room.roomNumber} ({room.type})</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{room.district}</div>
                    <div className="text-xs text-gray-400">{room.city}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-900">{room.occupiedBeds}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-500">{room.capacity}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{room.availableBeds} beds available</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    KSh {room.price}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(room.availabilityStatus)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openEditModal(room)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(room.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rooms.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No rooms found. Add a room to get started.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="dormitory">Dormitory</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Block</label>
                  <input required type="text" value={formData.block} onChange={e => setFormData({...formData, block: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                  <input required type="text" value={formData.roomNumber} onChange={e => setFormData({...formData, roomNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input required type="text" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSh)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Total Beds)</label>
                  <input required type="number" min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <input required type="number" min="1" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupied Beds</label>
                  <input required type="number" min="0" max={formData.capacity} value={formData.occupiedBeds} onChange={e => setFormData({...formData, occupiedBeds: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facilities (comma separated)</label>
                <input type="text" value={formData.facilities} onChange={e => setFormData({...formData, facilities: e.target.value})} placeholder="e.g. WiFi, AC, Study Desk" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm">
                  {editingRoom ? 'Save Changes' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
