import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Link } from 'react-router-dom'
const ContestList = ({contest,problemName,contestName}) => {
 
  
  return (
  
   <Link to={`/contestproblem/${contestName}/${problemName}`}>
    <Card className='bg-black-400 '>
  <CardHeader>
    <CardTitle className='capitalize text-white text-3xl font-bold'>{contest?.problemName}</CardTitle>
  </CardHeader>
  <CardContent className='flex flex-col gap-6'>
    <p className='text-white-400 text-2xl'>{contest?.problemDiffcuilty}</p>
    <div className='flex justify-between items-center text-2xl'>
       <div>
       <span className=' text-white'>Submissions:</span>
       <span className='text-white '>{contest?.problemSubmissions}</span>
       </div>
      <div>
      <span className=' text-white'>AcceptenceRate:</span>
      <span className='text-white '>{contest?.acceptenceRate}%</span>
      </div>
    </div>
  </CardContent>
</Card>
   </Link>
  )
}

export default ContestList
