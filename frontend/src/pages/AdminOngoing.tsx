
import { motion } from 'framer-motion'

import { Navbar } from '@/components/ui/AdminNavbar'

import { AdminCard } from '@/components/ui/Admincard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'





export  function AdminOngoing() {
  const [polls,setPolls]=useState()
  const [flag,setFlag]=useState(true)

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/admin/ongoing`,{
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
      <h1 className="text-3xl font-bold text-blue-800 my-6">Completed Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
        //@ts-ignore
        polls.map((poll) => (
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