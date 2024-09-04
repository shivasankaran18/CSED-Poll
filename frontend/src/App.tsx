

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { StudLogin } from './pages/StudentLogin'
import { AdminLogin } from './pages/AdminLogin'


function App() {

  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/student/login" element={<StudLogin />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>



      </Routes>

    
    </BrowserRouter>


    </div>
    
  )
}

export default App
