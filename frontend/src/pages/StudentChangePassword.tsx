import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function StudentChangePassword(){
  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [search,]=useSearchParams()
  const navigate=useNavigate()
   
  const handleSubmit=async()=>{
    if(pass1!=pass2)
    {
        alert("passwords does not match..Re-enter again ")
        setPass1("")
        setPass2("")
        return
    }
    else if(pass1.length<8 || pass2.length<8)
    {
        alert("type password of length greater than or equal to 8")
        setPass1("")
        setPass2("")
        return
    }
    else{
        const res=await axios.post(`${BACKEND_URL}/api/student/changepassword/password`,{
            email:search.get("email"),
            password:pass1
        })
        console.log(res)
        navigate("/")


    }

  }


    return(
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
                <Label htmlFor="email">Enter New Password</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Re-Enter New Password</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
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