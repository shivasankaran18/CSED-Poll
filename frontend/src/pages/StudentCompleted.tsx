import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Navbar } from '@/components/ui/StudentNavbar'
import { StudentCard } from '@/components/ui/StudentCard'
import axios from 'axios'
import { BACKEND_URL } from '../../config'


interface PollOption {
  id: string
  text: string
  votes: number
  isSelected: boolean
}

interface CompletedPoll {
  id: string
  title: string
  description: string
  completedDate: string
  options: PollOption[]
  totalVotes: number
}

export  function StudentCompleted() {
  const [completedPolls,setCompletedPolls]=useState<[]>()
  const [optionsPolled,setOptionsPolled]=useState<{}>()
  const [loading,setLoading]=useState<boolean>(true)

  useEffect(() => {

    axios.get(`${BACKEND_URL}/api/student/polls`,{
      headers:{
        Authorization:localStorage.getItem("studenttoken")
      }
    }).then(data => {
      console.log(data.data)
      let temp:any={}
      data.data.polled.map((poll:any)=>{
        console.log(poll.polled)
       temp[poll.id]=poll.polled[0].option
      })
      console.log(temp)
      setCompletedPolls(data.data.polled); 
      setOptionsPolled(temp)
      setLoading(false)
  
      })
      .catch((error:any) => console.error('Error fetching polls:', error))
  }, [])

  if(loading)
  {
    return (
      <>
      Laoding..
      
      </>

    )
  }


  return (
    <div className='w-screen'>
        <Navbar val='Completed Polls'/>
    <div className="w-full  bg-purple-50 min-h-screen absolute left-0 top-0 mt-20">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Completed Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {//@ts-ignore
        completedPolls.map((poll) => (
          <motion.div
          //@ts-ignore
            key={poll.id  }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StudentCard poll={poll} options={optionsPolled} />
           
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  )
}