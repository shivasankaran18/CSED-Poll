import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"

export  function StudentChangePasssowrdLogin() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate=useNavigate()
  const handleSubmit = async () => {

    setIsLoading(true)
    try{
        const res=await axios.post(`${BACKEND_URL}/api/student/changepassword/login`,{
            email
        })
        navigate(`/student/changepassword/otp?email=${res.data.email}`)
        console.log(res)
     


    }
    catch{
        console.log("hii")
        window.alert("error")

    }
    finally{
        setEmail("")
        setIsLoading(false)
    }
   
  


    
  
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 w-screen absolute left-0 top-0">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email to receive a one-time password
          </CardDescription>
        </CardHeader>
        <div >
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} variant="student"className="w-full text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </CardFooter>
        </div>
      
      
      </Card>
    </div>
  )
}