import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { Navbar } from "@/components/ui/StudentNavbar"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { Calendar, Clock } from "lucide-react"


  


export function StudentOngoing() {
  const [polls, setPolls] = useState([])
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [reasons, setReasons] = useState<Record<string, string>>({})
  const [flag,setFlag]=useState<boolean>(true)
  const [reasonPolls,setReasonPolls]=useState<{} >()
  const [temp,setTemp]=useState<Record<string, string>>({})
  const [loading,setLoading]=useState<boolean>(true)



  useEffect(() => {

    axios.get(`${BACKEND_URL}/api/student/polls`,{
      headers:{
        Authorization:localStorage.getItem("studenttoken")
      }
    }).then(data => {
      console.log(data.data)
      let temp:any={}
      data.data.unpolled.map((poll:any)=>{
        poll.options.map((option:any)=>{
          if(option.reason)
          {
            //@ts-ignore
            if(!temp[poll.id])
            {
              temp[poll.id]=[]
          
            }
            temp[poll.id].push(option.id)
          }
        })
      })
      setPolls(data.data.unpolled); 
      setReasonPolls(temp )
      setLoading(false)
      console.log(temp)
      })
      .catch(error => console.error('Error fetching polls:', error))
  }, [flag])

  const handleOptionChange = (pollId: string, value: string) => {
    //@ts-ignore
      let poll=polls.find((x)=>x.id===pollId)
      //@ts-ignore
      let opt=poll.options.find((x)=>x.name===value)
      console.log(opt)
      setResponses(prev => ({ ...prev, [pollId]: opt.id }))
      setTemp(prev=>({...prev,[pollId]:value}))
      if (value !== "No") {
        setReasons(prev => {
          const newReasons = { ...prev }
          delete newReasons[pollId]
          return newReasons
        })

    }
    console.log(reasons[pollId]+"   "+responses[pollId])
  }

  const handleReasonChange = (pollId: string, reason: string) => {

      setReasons(prev => ({ ...prev, [pollId]: reason }))

  }

  const handleClear = (pollId: string) => {
    setResponses(prev => {
      const newResponses = { ...prev }
      delete newResponses[pollId]
      return newResponses
    })
    setReasons(prev => {
      const newReasons = { ...prev }
      delete newReasons[pollId]
      return newReasons
    })
    setTemp(prev => {
      const newTemp = { ...prev };
      delete newTemp[pollId];
      return newTemp;
    });
  
  }

  const handleSubmit=async (pollid:number)=>{
    try{
      console.log(responses[pollid])
      if(reasons[pollid])
      {
        const res=await axios.post(`${BACKEND_URL}/api/student/poll`,{
          pollid,
          option:responses[pollid],
          reason:reasons[pollid]
    
        },{
          headers:{
            Authorization:localStorage.getItem("studenttoken")
          }
        })
        console.log(res)
    
      }
      else{
  
        const res=await axios.post(`${BACKEND_URL}/api/student/poll`,{
          pollid,
          option:responses[pollid],
    
        },{
          headers:{
            Authorization:localStorage.getItem("studenttoken")
          }
        })
        console.log(res)
  
      }


    }
    catch{
      alert("error")
    }
    finally{
      setFlag(!flag)
    }
   
  

    
   
  }

  if(loading)
  {
    return(<>
    Loading...
    
    </>)
  }

  return (
    <div className="w-screen">
      <Navbar val="Ongoing Polls" />
   
      <div className="mx-auto p-4 bg-purple-50 min-h-screen w-full absolute top-0 left-0 mt-14">
        <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">Ongoing Polls</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {polls.map((poll: any) => (
            <Card key={poll.id} className="border-purple-200 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-purple-700">{poll.title}</CardTitle>
                <CardDescription>{poll.description}</CardDescription>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{poll.stdate}</span>
            </div>
            {poll.sttime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{poll.sttime}</span>
              </div>
            )}
          </div>
              
              </CardHeader>
              <CardContent className="flex-grow">
                <RadioGroup
                  onValueChange={(value) => handleOptionChange(poll.id, value)}
                  value={temp[poll.id] || ""}
                  
                >
                 {poll.options.map((option: any) => (
                    <div key={option.id} className="flex items-center justify-between space-x-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.name} id={`${poll.id}-${option.id}`} />
                        <Label htmlFor={`${poll.id}-${option.id}`}>{option.name}</Label>
                      </div>
                      <span className="text-sm text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full">
                        {option.count} votes
                      </span>
                    </div>
                  ))}
                
                </RadioGroup>
                {//@ts-ignore
                reasonPolls!=null && reasonPolls[poll.id].includes(responses[poll.id]) && (
                  <div className="mt-4">
                    <Label htmlFor={`reason-${poll.id}`}>Please provide a reason:</Label>
                    <Textarea
                      id={`reason-${poll.id}`}
                      value={reasons[poll.id] || ""}
                      onChange={(e) => handleReasonChange(poll.id, e.target.value)}
                      className="mt-2"
                     
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button onClick={() => handleClear(poll.id)} variant="student" className="text-white">
                  Clear
                </Button>
                <Button variant="student" onClick={()=>handleSubmit(poll.id)} className="text-white">
                  Confirm
                </Button>
              
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
