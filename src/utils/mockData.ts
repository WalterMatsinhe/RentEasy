import { Room, Application, Allocation, PaymentRecord, Notification } from '@/types'

export const mockRooms: Room[] = [
  {
    id: '1',
    title: 'Seyhan Premium Dormitory',
    district: 'Seyhan',
    city: 'Adana',
    price: 3500,
    capacity: 1,
    bathrooms: 1,
    type: 'single',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
    ],
    roomNumber: 'A101',
    block: 'A',
    occupiedBeds: 1,
    availableBeds: 0,
    facilities: ['WiFi', 'AC', 'Private Desk'],
    availabilityStatus: 'full',
  },
  {
    id: '2',
    title: 'Adana Student Housing',
    district: 'Adana',
    city: 'Adana',
    price: 2500,
    capacity: 2,
    bathrooms: 1,
    type: 'double',
    image: 'https://images.unsplash.com/photo-1522771731478-4ea7595e0c66?w=800',
    images: [
      'https://images.unsplash.com/photo-1522771731478-4ea7595e0c66?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    roomNumber: 'B204',
    block: 'B',
    occupiedBeds: 1,
    availableBeds: 1,
    facilities: ['WiFi', 'Mini Fridge', 'Balcony'],
    availabilityStatus: 'available',
  },
  {
    id: '3',
    title: 'Balcalı Campus Hostel',
    district: 'Sarıçam',
    city: 'Adana',
    price: 1800,
    capacity: 4,
    bathrooms: 2,
    type: 'dormitory',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
      'https://images.unsplash.com/photo-1522771731478-4ea7595e0c66?w=800',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
    ],
    roomNumber: 'C105',
    block: 'C',
    occupiedBeds: 2,
    availableBeds: 2,
    facilities: ['WiFi', 'Study Area', 'Locker'],
    availabilityStatus: 'available',
  },
  {
    id: '4',
    title: 'Yüreğir Comfort Rooms',
    district: 'Yüreğir',
    city: 'Adana',
    price: 4000,
    capacity: 1,
    bathrooms: 1,
    type: 'single',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522771731478-4ea7595e0c66?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800'
    ],
    roomNumber: 'A201',
    block: 'A',
    occupiedBeds: 0,
    availableBeds: 1,
    facilities: ['WiFi', 'AC', 'TV'],
    availabilityStatus: 'available',
  },
  {
    id: '5',
    title: 'Adana Central Shared',
    district: 'Seyhan',
    city: 'Adana',
    price: 2200,
    capacity: 2,
    bathrooms: 1,
    type: 'double',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    roomNumber: 'D304',
    block: 'D',
    occupiedBeds: 2,
    availableBeds: 0,
    facilities: ['WiFi', 'Shared Kitchen'],
    availabilityStatus: 'full',
  },
  {
    id: '6',
    title: 'Sarıçam Budget Dorm',
    district: 'Sarıçam',
    city: 'Adana',
    price: 1500,
    capacity: 6,
    bathrooms: 2,
    type: 'dormitory',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1522771731478-4ea7595e0c66?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800'
    ],
    roomNumber: 'E101',
    block: 'E',
    occupiedBeds: 6,
    availableBeds: 0,
    facilities: ['WiFi', 'Gym Access'],
    availabilityStatus: 'full',
  },
]

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    studentId: 'student-1',
    roomId: '2',
    status: 'approved',
    appliedAt: '2026-08-15T10:00:00Z',
    studentNumber: '2026101',
    fullName: 'Demo Student',
    phoneNumber: '555-0123',
    course: 'Computer Science',
    yearOfStudy: '2',
    gender: 'Other',
    additionalInfo: 'Would like a bottom bunk if possible.'
  }
]

export const mockAllocations: Allocation[] = [
  {
    id: 'alloc-1',
    applicationId: 'app-1',
    studentId: 'student-1',
    roomId: '2',
    bedNumber: 1,
    status: 'active',
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2027-06-30T00:00:00Z'
  }
]

export const mockPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    allocationId: 'alloc-1',
    studentId: 'student-1',
    amount: 2500,
    status: 'completed',
    paymentDate: '2026-08-28T14:30:00Z',
    referenceNumber: 'TRX-987654321'
  },
  {
    id: 'pay-2',
    allocationId: 'alloc-1',
    studentId: 'student-1',
    amount: 2500,
    status: 'pending',
    paymentDate: '',
    referenceNumber: ''
  }
]

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    title: 'Application Approved',
    message: 'Your application for Adana Student Housing has been approved.',
    isRead: true,
    createdAt: '2026-08-20T09:15:00Z'
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    title: 'Payment Due',
    message: 'Your monthly rent payment of KSh 2500 is due in 3 days.',
    isRead: false,
    createdAt: '2026-09-17T08:00:00Z'
  }
]
