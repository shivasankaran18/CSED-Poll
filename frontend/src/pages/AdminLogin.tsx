import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCog, Mail, Lock } from 'lucide-react'
import axios from "axios"
import {BACKEND_URL } from "../../config"
import { useNavigate } from 'react-router-dom'


export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate();
  const [flag,setFlag]=useState<boolean>(false)

  const handleSubmit = async () => {
    try{
      setFlag(true)
      const res=await axios.post(`${BACKEND_URL}/api/admin/login`,{
        email,
        password
  
      })
      console.log(res.data)
    localStorage.setItem("admintoken",res.data.token)
    navigate("/admin/ongoing")

    }
    catch(err){

      alert("error")
      setFlag(true)
    }
   
    
    
  }

  return (
    <div className="h-screen w-screen absolute top-0 left-0 bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <UserCog className="w-10 h-10 text-blue-600 mr-3 sm:mr-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Login</h1>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <Button 
              type="submit" 
              variant={"admin"}
              className="w-full text-lg sm:text-base"
              onClick={handleSubmit}
            >
              {flag?"Logging..":"Log In"}
            </Button>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
        </div>

        <div className="p-4 sm:p-8 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-600 text-center">
            For technical support, please contact the <a href="#" className="text-purple-600 hover:underline">IT department</a> or refer to the <a href="#" className="text-purple-600 hover:underline">admin guide</a>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
