import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { GraduationCap, UserCog } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Landing() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const navigate=useNavigate()

  return (
    <div className="w-screen h-screen  absolute top-0 left-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center  ">
  
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 70, 0],
            y: [0, -40, 0],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

    
      <motion.div 
        className="z-10 bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-filter backdrop-blur-sm"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-blue-800 mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CSE D Student Polls
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-8 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome to our polling platform where administrators can create polls and students can participate in them.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-evenly">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="w-64 h-16 text-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              onMouseEnter={() => setHoveredButton('admin')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={()=>navigate("/admin/login")}
            >
              <UserCog size={24} />
              Login as Admin
              {hoveredButton === 'admin' && (
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              variant="secondary"
              className="w-64 h-16 text-lg flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              onMouseEnter={() => setHoveredButton('student')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={()=>{navigate("/student/login")}}
            >
              <GraduationCap size={24} />
              Login as Student
              {hoveredButton === 'student' && (
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}