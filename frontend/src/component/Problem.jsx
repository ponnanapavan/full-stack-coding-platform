import CodeEditor from '@/pages/CodeEditor';
import Question from '@/pages/Question';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Problem = () => {
    const {id}=useParams();
    const [question,setQuestion]=useState();
  
    useEffect(()=>{

        async function getProblem(){
          try{
                const result=await fetch(`http://localhost:4000/api/getProblem/${id}`,{
                  method:'GET'
                })
                const response=await result.json();
                setQuestion(response);
          }catch(err){
          }
        }
            getProblem();
       },[])
  return (
    <div className='w-full min-h-screen flex gap-3'>
     {question ? (
       <>
         <Question question={question}/>
         <CodeEditor questionName={question?.codeData?.problemName} />
       </>
     ):(<div>loading...</div>)}
    </div>
  )
}

export default Problem
