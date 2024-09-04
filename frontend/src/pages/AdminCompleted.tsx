
import { motion } from 'framer-motion'

import { Navbar } from '@/components/ui/AdminNavbar'

import { AdminCard } from '@/components/ui/Admincard'
import { useEffect, useState } from 'react'
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

const completedPolls: CompletedPoll[] = [
  {
    id: '1',
    title: 'Preferred Programming Language',
    description: 'Survey on the most popular programming languages among students',
    completedDate: '2023-05-15',
    options: [
      { id: '1a', text: 'Python', votes: 60, isSelected: true },
      { id: '1b', text: 'JavaScript', votes: 45, isSelected: false },
      { id: '1c', text: 'Java', votes: 30, isSelected: false },
      { id: '1d', text: 'C++', votes: 15, isSelected: false },
    ],
    totalVotes: 150
  },
  {
    id: '2',
    title: 'Study Method Effectiveness',
    description: 'Evaluation of different study methods for CSE courses',
    completedDate: '2023-06-02',
    options: [
      { id: '2a', text: 'Group study', votes: 42, isSelected: false },
      { id: '2b', text: 'Individual practice', votes: 36, isSelected: true },
      { id: '2c', text: 'Video tutorials', votes: 30, isSelected: false },
      { id: '2d', text: 'Textbook reading', votes: 12, isSelected: false },
    ],
    totalVotes: 120
  },
  {
    id: '3',
    title: 'Preferred Project Type',
    description: 'Survey on the types of projects students enjoy most in CSE',
    completedDate: '2023-06-20',
    options: [
      { id: '3a', text: 'Web Development', votes: 81, isSelected: false },
      { id: '3b', text: 'Mobile Apps', votes: 45, isSelected: true },
      { id: '3c', text: 'Data Analysis', votes: 36, isSelected: false },
      { id: '3d', text: 'AI/Machine Learning', votes: 18, isSelected: false },
    ],
    totalVotes: 180
  }
]

export  function AdminCompleted() {
  const [polls,setPolls]=useState()
  const [flag,setFlag]=useState(true)

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/admin/completed`,{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    }).then((data)=>{
      setPolls(data.data.polls)
      setFlag(false)

    })




  })
  if(flag)
  {
    return(
      <>
        Loading..
      </>
    )
  }


  return (
    <div className='w-screen'>
        <Navbar val='Completed Polls'/>
    <div className="w-full  bg-purple-50 min-h-screen absolute left-0 top-0 mt-20">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Completed Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedPolls.map((poll) => (
          <motion.div
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