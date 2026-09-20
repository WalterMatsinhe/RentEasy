import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Rooms from '@/pages/Rooms'
import RoomDetails from '@/pages/RoomDetails'
import NotFound from '@/pages/NotFound'

import { AuthProvider } from '@/context/AuthContext'
import { RoomProvider } from '@/context/RoomContext'
import { ApplicationProvider } from '@/context/ApplicationContext'
import { AllocationProvider } from '@/context/AllocationContext'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import ProtectedRoute from '@/components/ProtectedRoute'
import StudentLayout from '@/components/layout/StudentLayout'
import StudentDashboard from '@/pages/student/Dashboard'
import StudentProfile from '@/pages/student/Profile'
import StudentRooms from '@/pages/student/Rooms'
import StudentApply from '@/pages/student/Apply'
import StudentApplications from '@/pages/student/Applications'
import StudentAllocation from '@/pages/student/Allocation'
import StudentPayments from '@/pages/student/Payments'
import StudentNotifications from '@/pages/student/Notifications'

import AdminLayout from '@/components/layout/AdminLayout'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminStudents from '@/pages/admin/Students'
import AdminRooms from '@/pages/admin/Rooms'
import AdminApplications from '@/pages/admin/Applications'
import AdminAllocations from '@/pages/admin/Allocations'
import AdminReports from '@/pages/admin/Reports'

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <AllocationProvider>
          <RoomProvider>
            <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Student Portal Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="rooms" element={<StudentRooms />} />
              <Route path="apply" element={<StudentApply />} />
              <Route path="applications" element={<StudentApplications />} />
              <Route path="allocation" element={<StudentAllocation />} />
              <Route path="payments" element={<StudentPayments />} />
              <Route path="notifications" element={<StudentNotifications />} />
            </Route>
          </Route>

          {/* Admin Portal Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="allocations" element={<AdminAllocations />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>
          </Route>
        </Routes>
              </Router>
            </RoomProvider>
          </AllocationProvider>
        </ApplicationProvider>
    </AuthProvider>
  )
}

export default App
