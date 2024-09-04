import { motion } from 'framer-motion'
import { Navbar } from '@/components/ui/AdminNavbar'
import { AdminCard } from '@/components/ui/Admincard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { PlusIcon, MinusIcon } from 'lucide-react'

export function AdminOngoing() {
  const [polls, setPolls] = useState([])
  const [flag, setFlag] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pollForm, setPollForm] = useState({
    title: '',
    description: '',
    options: ['', ''],
    reasonsNeeded: [false, false],
    type: 'instant',
    stdate: '',
    sttime: ''
  })

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/admin/ongoing`, {
      headers: {
        Authorization: localStorage.getItem("admintoken")
      }
    }).then((data) => {
      setPolls(data.data.polls)
      setFlag(false)
    })
  }, [])

  const handleInputChange = (e:{name:string,value:string}, index = null) => {
    const { name, value } = e
    if (index !== null) {
      //@ts-ignore
      const newArray = [...pollForm[name]]
      newArray[index] = value
      setPollForm(prev => ({ ...prev, [name]: newArray }))
    } else {
      console.log(pollForm)
      setPollForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleReasonToggle = (index:any) => {
    const newReasonsNeeded = [...pollForm.reasonsNeeded]
    newReasonsNeeded[index] = !newReasonsNeeded[index]
    setPollForm(prev => ({ ...prev, reasonsNeeded: newReasonsNeeded }))
  }

  const addOption = () => {
    setPollForm(prev => ({
      ...prev,
      options: [...prev.options, ''],
      reasonsNeeded: [...prev.reasonsNeeded, false]
    }))
  }

  const removeOption = (index:any) => {
    setPollForm(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      reasonsNeeded: prev.reasonsNeeded.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
  
  
    console.log(pollForm)
    const res=await axios.post(`${BACKEND_URL}/api/poll/create`,pollForm,{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    })
    console.log(res.data)
    setIsDialogOpen(false)
  
    setPollForm({
      title: '',
      description: '',
      options: ['', ''],
      reasonsNeeded: [false, false],
      type: 'instant',
      stdate: '',
      sttime: ''
    })
  }

  if (flag) {
    return <div>Loading..</div>
  }

  return (
    <div className='w-screen'>
      <Navbar val='Ongoing Polls' />
      <div className="w-full bg-purple-50 min-h-screen absolute left-0 top-0 mt-20 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Ongoing Polls</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create Poll
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Poll</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    
                    onChange={(e)=>handleInputChange({name:'title',value:e.target.value},)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                
                    onChange={(e)=>handleInputChange({name:"description",value:e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Options</Label>
                  {pollForm.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        name="options"
                   
                        //@ts-ignore
                        onChange={(e) => handleInputChange({name:"options",value:e.target.value}, index)}
                        required
                        placeholder={`Option ${index + 1}`}
                        className="flex-grow"
                      />
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`reason-${index}`} className="text-sm">
                          Reason 
                        </Label>
                        <Switch
                          id={`reason-${index}`}
                          checked={pollForm.reasonsNeeded[index]}
                          onCheckedChange={() => handleReasonToggle(index)}
                        />
                      </div>
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="admin"
                    size="sm"
                    onClick={addOption}
                    className="mt-2"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Poll Type</Label>
                  <RadioGroup
                    name="type"
                    value={pollForm.type}
                    onValueChange={(value) => setPollForm(prev => ({ ...prev, type: value }))}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="instant" id="instant" />
                      <Label htmlFor="instant">Instant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled">Scheduled</Label>
                    </div>
                  </RadioGroup>
                </div>
                {pollForm.type === 'scheduled' && (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          type="date"
                          id="startDate"
                          name="startDate"
                   
                          onChange={(e)=>{handleInputChange({name:"description",value:e.target.value})}}
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          type="time"
                          id="startTime"
                 
                          onChange={(e)=>handleInputChange({name:"description",value:e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                <Button type="submit" onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Create Poll
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <motion.div
            //@ts-ignore
              key={poll.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminCard poll={poll} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}