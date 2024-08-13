import React, { useEffect, useState } from 'react'
import ProblemsList from './ProblemsList';

const PostedCodes = () => {
    const [problems,setProblems]=useState([]);
   
    useEffect(()=>{

        async function getProblems(){
            const response=await fetch('http://localhost:4000/api/getProblems',{
                method:'GET',
            })
                const data=await response.json();
                setProblems(data);
        }
           getProblems();
    },[])
  return (
    <div className='w-full lg:w-[90%] min-h-screen paddings'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
      {problems.length > 0 && problems.map((problem, index) => (
        <ProblemsList key={index} problem={problem} setProblems={setProblems} />
      ))}
    </div>
  </div>
  
  )
}

export default PostedCodes
