import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Divide } from 'lucide-react'
import time from '../assets/time.svg'
import { Link } from 'react-router-dom'

const ProblemList = ({problem}) => {
 
  return (
    <Link to={`/problem/${problem?.codeData?.problemName}/${problem?._id}`}>
        { problem.codeData?( <Card className=' bg-black-400 rounded-lg min-h-[200px] text-white cursor-pointesr p-5 flex flex-col gap-6 cursor-pointer'>
        <CardHeader>
          <CardTitle ><p className='text-3xl font-bold'>{problem?.codeData?.problemName}</p></CardTitle>
        </CardHeader>
        <CardContent className='flex-between items-center'>
          <p className='text-xl'><span className='text-2xl'>Difficulty: </span>{problem?.codeData?.problemDiffcuilty}</p>
         <div className='flex gap-4'>
         <img src={time} alt="" /><span>{problem?.codeData?.avgTime}min</span>
         </div>

        </CardContent>
        <CardFooter className='flex flex-between items-center'>
          <div className='flex gap-3'><span className='text-xl font-bold'>Submissions:</span><p className='text-2xl'>{problem?.codeData?.submitted}</p></div>
          <div className='flex gap-3'><span className='text-xl font-bold'>AcctepenceRate:</span><p className='text-2xl'>{problem?.codeData?.acceptanceRate}%</p></div>
        </CardFooter>
      </Card>):(<div>Loading.....</div>)}
    </Link>
  
  )
}

export default ProblemList
