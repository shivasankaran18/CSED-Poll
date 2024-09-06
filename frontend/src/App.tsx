

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { StudLogin } from './pages/StudentLogin'
import { AdminLogin } from './pages/AdminLogin'
import {  StudentOngoing } from './pages/StudentOngoing'
import { StudentCompleted } from './pages/StudentCompleted'
import { AdminOngoing } from './pages/AdminOngoing'
import { AdminCompleted } from './pages/AdminCompleted'
import { AdminPollDetails } from './pages/AdminPollDetails'
import { StudentPollDetails } from './pages/StudentPollDetails'
import { StudentChangePasssowrdLogin } from './pages/StudentChangePasswordLogin'
import { StudentChangePasswordOTP } from './pages/StudentChangePasswordOtp'
import { StudentChangePassword } from './pages/StudentChangePassword'


function App() {

  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/student/login" element={<StudLogin />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/student/ongoing" element={<StudentOngoing />}></Route>
        <Route path="/student/completed" element={<StudentCompleted />}></Route>
        <Route path="/admin/ongoing" element={<AdminOngoing />}></Route>
        <Route path="/admin/completed" element={<AdminCompleted />}></Route>
        <Route path="/admin/polldetails" element={<AdminPollDetails />}></Route>
        <Route path="/student/polldetails" element={<StudentPollDetails />}></Route>
        <Route path="/student/changepassword/login" element={<StudentChangePasssowrdLogin />}></Route>
        <Route path="/student/changepassword/otp" element={<StudentChangePasswordOTP />}></Route>
        <Route path="/student/changepassword/password" element={<StudentChangePassword />}></Route>



      </Routes>

    
    </BrowserRouter>


    </div>
    
  )
}

export default App
