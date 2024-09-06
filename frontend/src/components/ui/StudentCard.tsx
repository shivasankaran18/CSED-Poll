import { Calendar, Check, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import {motion} from 'framer-motion'
import { Progress } from "./progress";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export function StudentCard({poll,options}:{poll:any,options:any}){
  const navigate=useNavigate()

    return(

        <Card className="h-full flex flex-col border-purple-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-purple-700">{poll.title}</CardTitle>
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
          <div className="space-y-2">
            {poll.options.map((option:any) => (
              <div key={option.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{option.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">{option.count} votes</span>
                    {options[poll.id]===option.id && (
                      <motion.div
                        className="bg-purple-600 rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
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
          variant="student" 
          className="w-full text-white mt-4"
          onClick={()=>navigate(`/student/polldetails?id=${poll.id}`)}
          >
                View Details
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
        </CardContent>
        
      </Card>


    )


}