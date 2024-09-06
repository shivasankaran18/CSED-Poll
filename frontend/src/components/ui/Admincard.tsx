import { useState } from "react"
import { Check, ChevronRight, Calendar, Clock, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { BACKEND_URL } from "../../../config"

export function AdminCard({ poll, }: { poll: any; }) {
  const navigate = useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = async() => {
    const res=await axios.post(`${BACKEND_URL}/api/poll/delete`,{
      pollid:poll.id
    },{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <Card className="h-full flex flex-col border-purple-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-blue-700">{poll.title}</CardTitle>
            <CardDescription>{poll.description}</CardDescription>
          </div>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="admin"
                size="icon"
                className="absolute top-4 right-4 md:static"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete poll</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this poll? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start justify-between gap-2">
              <Button variant="admin" onClick={() => setIsDeleteDialogOpen(false)}>
                  Back
                </Button>
                <Button variant="admin" onClick={handleDelete}>
                  Confirm
                </Button>
               
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
        <div className="space-y-2">
          {poll.options.map((option: any) => (
            <div key={option.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{option.name}</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{option.count} votes</span>
                </div>
              </div>
              <Progress
                value={(option.count / poll.count) * 100}
                className="h-2 bg-purple-100"
              />
            </div>
          ))}
        </div>
        <Button 
          variant="admin"
          className="w-full mt-4"
          onClick={() => navigate(`/admin/polldetails?id=${poll.id}`)}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}