import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../../config"


export  function StudentChangePasswordOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [search,]=useSearchParams();
  const navigate=useNavigate()

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {

    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {

    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) {
        alert('enter 6 digits')
      return
    }

    setIsLoading(true)

    
    try {
        console.log(search.get("email"))
        const res=await axios.post(`${BACKEND_URL}/api/student/changepassword/otp`,{
            email:search.get("email"),
            otp:finalOtp
        })
        console.log(res)
        navigate(`/student/changepassword/password?email=${search.get("email")}`)
      

     
      console.log("Final OTP:", finalOtp)
    } catch (error) {
     
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <div >
          <CardContent>
            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{1}"
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-white" type="submit" onClick={handleSubmit}disabled={isLoading} variant={"student"}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}