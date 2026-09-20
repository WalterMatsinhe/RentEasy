import { createContext, useContext, useState, ReactNode } from 'react'
import { Allocation } from '@/types'

// We will initialize with empty or mock allocations, but we need to ensure bedNumber is present.
// Since mockAllocations in mockData doesn't have bedNumber, we'll map it to default to 1.
import { mockAllocations } from '@/utils/mockData'

interface AllocationContextType {
  allocations: Allocation[]
  createAllocation: (allocation: Omit<Allocation, 'id' | 'status' | 'startDate'>) => void
  updateAllocationStatus: (id: string, status: Allocation['status']) => void
}

const AllocationContext = createContext<AllocationContextType | undefined>(undefined)

export const AllocationProvider = ({ children }: { children: ReactNode }) => {
  const [allocations, setAllocations] = useState<Allocation[]>(() => {
    return mockAllocations.map(a => ({
      ...a,
      bedNumber: a.bedNumber || 1 // fallback for mock data
    }))
  })

  const createAllocation = (data: Omit<Allocation, 'id' | 'status' | 'startDate'>) => {
    const newAllocation: Allocation = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
      startDate: new Date().toISOString()
    }
    setAllocations(prev => [...prev, newAllocation])
  }

  const updateAllocationStatus = (id: string, status: Allocation['status']) => {
    setAllocations(prev => prev.map(a => 
      a.id === id ? { ...a, status } : a
    ))
  }

  return (
    <AllocationContext.Provider value={{ allocations, createAllocation, updateAllocationStatus }}>
      {children}
    </AllocationContext.Provider>
  )
}

export const useAllocations = () => {
  const context = useContext(AllocationContext)
  if (context === undefined) {
    throw new Error('useAllocations must be used within an AllocationProvider')
  }
  return context
}
