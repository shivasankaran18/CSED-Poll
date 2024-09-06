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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
    polltype:"",
    stdate: '',
    sttime: '',
    autoDelete: true
  })
  const [temp,setTemp]=useState<boolean>(true)


  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/admin/ongoing`, {
      headers: {
        Authorization: localStorage.getItem("admintoken")
      }
    }).then((data) => {
      setPolls(data.data.polls)
      setFlag(false)
    })
  }, [temp])

  const format = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate);
    return formattedDate
  }

  const handleInputChange = (e: { name: string, value: string | boolean }, index = null) => {
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

  const handleReasonToggle = (index: any) => {
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

  const removeOption = (index: any) => {
    setPollForm(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      reasonsNeeded: prev.reasonsNeeded.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    console.log(pollForm)
    const res = await axios.post(`${BACKEND_URL}/api/poll/create`, pollForm, {
      headers: {
        Authorization: localStorage.getItem("admintoken")
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
      polltype:"",
      stdate: '',
      sttime: '',
      autoDelete: true
    })
    setTemp(!temp)
  }

  if (flag) {
    return <div>Loading..</div>
  }

  return (
    <div className='w-screen'>
      <Navbar val='Ongoing Polls' />
      <div className="w-full bg-purple-50 min-h-screen absolute left-0 top-0 mt-20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center w-full sm:w-auto mb-4 sm:mb-0">Ongoing Polls</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create Poll
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Poll</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    onChange={(e) => handleInputChange({ name: 'title', value: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    onChange={(e) => handleInputChange({ name: "description", value: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className='ps-4'>
                Poll Type
              </Label>
              <Select
                onValueChange={(value) => handleInputChange({name:"polltype", value})}
                value={pollForm.polltype}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select poll type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="leetcode">LeetCode</SelectItem>
                  <SelectItem value="codechef">CodeChef</SelectItem>
                  <SelectItem value="codeforces">Codeforces</SelectItem>
                </SelectContent>
              </Select>
            </div>
                <div className="space-y-2 flex flex-col sm:flex-row items-center p-2 rounded">
                  <Label className='text-sm sm:text-base mb-2 sm:mb-0'>Autodelete After Two Weeks </Label>
                  <Switch
                    className='ml-0 sm:ml-auto'
                    checked={pollForm.autoDelete}
                    onCheckedChange={() => handleInputChange({ name: "autoDelete", value: !pollForm.autoDelete })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Options</Label>
                  {pollForm.options.map((_, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                      <Input
                        name="options"
                        //@ts-ignore
                        onChange={(e) => handleInputChange({ name: "options", value: e.target.value }, index)}
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
                  <Label>Poll Schedule</Label>
                  <RadioGroup
                    name="type"
                    value={pollForm.type}
                    onValueChange={(value) => setPollForm(prev => ({ ...prev, type: value }))}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
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
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="flex-1">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          type="date"
                          id="startDate"
                          name="startDate"
                          onChange={(e) => { handleInputChange({ name: "stdate", value: format(e.target.value) }) }}
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          type="time"
                          id="startTime"
                          onChange={(e) => handleInputChange({ name: "sttime", value: e.target.value })}
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
              <AdminCard poll={poll} setTemp={setTemp}/>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}