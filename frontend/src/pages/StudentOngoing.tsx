import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "../hooks/use-toast"
import { Navbar } from "@/components/ui/StudentNavbar"

interface Poll {
  id: string
  title: string
  description: string
  options: string[]
}

const ongoingPolls: Poll[] = [
  {
    id: "1",
    title: "Preferred Programming Language",
    description: "Which programming language do you find most useful in your CSE studies?",
    options: ["Python", "Java", "C++", "JavaScript"]
  },
  {
    id: "2",
    title: "Study Method Effectiveness",
    description: "Which study method do you find most effective for CSE courses?",
    options: ["Group study", "Individual practice", "Video tutorials", "Textbook reading"]
  },
  {
    id: "3",
    title: "Preferred Project Type",
    description: "What type of projects do you enjoy most in your CSE curriculum?",
    options: ["Web Development", "Mobile Apps", "Data Analysis", "AI/Machine Learning"]
  },
  {
    id: "4",
    title: "Most Challenging CSE Subject",
    description: "Which CSE subject do you find most challenging?",
    options: ["Algorithms", "Database Systems", "Computer Networks", "Operating Systems"]
  }
]

export  function StudentOngoing() {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [reasons, setReasons] = useState<Record<string, string>>({})
  const [confirmedPolls, setConfirmedPolls] = useState<Set<string>>(new Set())

  const handleOptionChange = (pollId: string, value: string) => {
    if (!confirmedPolls.has(pollId)) {
      setResponses(prev => ({ ...prev, [pollId]: value }))
      if (value !== "No") {
        setReasons(prev => {
          const newReasons = { ...prev }
          delete newReasons[pollId]
          return newReasons
        })
      }
    }
  }

  const handleReasonChange = (pollId: string, reason: string) => {
    if (!confirmedPolls.has(pollId)) {
      setReasons(prev => ({ ...prev, [pollId]: reason }))
    }
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
    setConfirmedPolls(prev => {
      const newConfirmed = new Set(prev)
      newConfirmed.delete(pollId)
      return newConfirmed
    })
  }

  const handleConfirm = (pollId: string) => {
    if (responses[pollId]) {
      setConfirmedPolls(prev => new Set(prev).add(pollId))
      toast({
        title: "Poll Response Confirmed",
        description: `Your response for "${ongoingPolls.find(p => p.id === pollId)?.title}" has been recorded.`,
      })
    } else {
      toast({
        title: "No Response Selected",
        description: "Please select an option before confirming.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-screen">
        <Navbar val='Ongoing Polls'/>


   
    <div className=" mx-auto p-4 bg-purple-50 min-h-screen w-full absolute top-0 left-0 mt-14">
        
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">Ongoing Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ongoingPolls.map(poll => (
          <Card key={poll.id} className="border-purple-200 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-purple-700">{poll.title}</CardTitle>
              <CardDescription>{poll.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <RadioGroup
                onValueChange={(value) => handleOptionChange(poll.id, value)}
                value={responses[poll.id] || ""}
                disabled={confirmedPolls.has(poll.id)}
              >
                {poll.options.map(option => (
                  <div key={option} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option} id={`${poll.id}-${option}`} />
                    <Label htmlFor={`${poll.id}-${option}`}>{option}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="No" id={`${poll.id}-No`} />
                  <Label htmlFor={`${poll.id}-No`}>No</Label>
                </div>
              </RadioGroup>
              {responses[poll.id] === "No" && (
                <div className="mt-4">
                  <Label htmlFor={`reason-${poll.id}`}>Please provide a reason:</Label>
                  <Textarea
                    id={`reason-${poll.id}`}
                    value={reasons[poll.id] || ""}
                    onChange={(e) => handleReasonChange(poll.id, e.target.value)}
                    className="mt-2"
                    disabled={confirmedPolls.has(poll.id)}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <Button
                onClick={() => handleClear(poll.id)}
                variant="student"
                className="bg-white text-purple-600 border-purple-600 hover:bg-purple-100"
                disabled={confirmedPolls.has(poll.id)}
              >
                Clear
              </Button>
              <Button
                onClick={() => handleConfirm(poll.id)}
                variant={"student"}
                className="text-white"
                disabled={confirmedPolls.has(poll.id)}
              >
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