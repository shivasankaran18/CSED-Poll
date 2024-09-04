

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { StudLogin } from './pages/StudentLogin'
import { AdminLogin } from './pages/AdminLogin'
import {  StudentOngoing } from './pages/StudentOngoing'
import { StudentCompleted } from './pages/StudentCompleted'
import { AdminOngoing } from './pages/AdminOngoing'
import { AdminCompleted } from './pages/AdminCompleted'
import { PollDetails } from './pages/PollDetails'


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
        <Route path="/polldetails" element={<PollDetails />}></Route>



      </Routes>

    
    </BrowserRouter>


    </div>
    
  )
}

export default App
