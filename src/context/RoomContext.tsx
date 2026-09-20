import { createContext, useContext, useState, ReactNode } from 'react'
import { Room } from '@/types'
import { mockRooms } from '@/utils/mockData'

interface RoomContextType {
  rooms: Room[]
  addRoom: (room: Omit<Room, 'id' | 'availabilityStatus' | 'availableBeds'>) => void
  updateRoom: (id: string, updates: Partial<Room>) => void
  deleteRoom: (id: string) => void
}

const RoomContext = createContext<RoomContextType | undefined>(undefined)

// Helper to calculate status based on capacity and occupied beds
const calculateRoomStatus = (capacity: number, occupied: number): Room['availabilityStatus'] => {
  if (occupied === 0) return 'available'
  if (occupied >= capacity) return 'full'
  return 'partially_occupied'
}

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    // Initialize mock rooms with correct status calculation
    return mockRooms.map(room => ({
      ...room,
      availableBeds: room.capacity - room.occupiedBeds,
      availabilityStatus: calculateRoomStatus(room.capacity, room.occupiedBeds)
    }))
  })

  const addRoom = (roomData: Omit<Room, 'id' | 'availabilityStatus' | 'availableBeds'>) => {
    const newRoom: Room = {
      ...roomData,
      id: Math.random().toString(36).substr(2, 9),
      availableBeds: roomData.capacity - roomData.occupiedBeds,
      availabilityStatus: calculateRoomStatus(roomData.capacity, roomData.occupiedBeds)
    }
    setRooms(prev => [...prev, newRoom])
  }

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== id) return room
      
      const updatedRoom = { ...room, ...updates }
      
      // Recalculate if capacity or occupied beds change
      if (updates.capacity !== undefined || updates.occupiedBeds !== undefined) {
        updatedRoom.availableBeds = updatedRoom.capacity - updatedRoom.occupiedBeds
        updatedRoom.availabilityStatus = calculateRoomStatus(updatedRoom.capacity, updatedRoom.occupiedBeds)
      }
      
      return updatedRoom
    }))
  }

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id))
  }

  return (
    <RoomContext.Provider value={{ rooms, addRoom, updateRoom, deleteRoom }}>
      {children}
    </RoomContext.Provider>
  )
}

export const useRooms = () => {
  const context = useContext(RoomContext)
  if (context === undefined) {
    throw new Error('useRooms must be used within a RoomProvider')
  }
  return context
}
