
import React from 'react';

const Question = ({ question }) => { 
  
   console.log(question)

   const difficultyColor = question.codeData
    ? question.codeData.problemDiffcuilty === 'easy'
        ? 'text-green-500'
        : question.codeData.problemDiffcuilty === 'medium'
        ? 'text-orange-400'
        : question.codeData. problemDiffcuilty === 'hard'
        ? 'text-red-400'
        : ''
    : question.problemDiffcuilty === 'easy'
    ? 'text-green-500'
    : question.problemDiffcuilty === 'medium'
    ? 'text-yellow-400'
    : question.problemDiffcuilty === 'hard'
    ? 'text-red-400'
    : '';
    console.log(difficultyColor)

  return (
    <div className='w-[45%] min-h-screen mt-28 p-10'>
      <div className='w-full border-2 border-black-200 rounded-lg bg-black-400 p-6 flex flex-col gap-6 '>
        <div className='flex flex-col gap-2'>
        <h2 className='text-4xl capitalize   text-white'>{question?.codeData ? question?.codeData.problemName :question.problemName }</h2>
        <h3 className={`text-xl ${difficultyColor}`}>{question?.codeData ?  question?.codeData?.problemDiffcuilty : question.problemDiffcuilty}</h3>
        </div>
        <p  className='text-white-400 bg-black-400 text-2xl ' dangerouslySetInnerHTML={{ __html:question?.codeData?question?.codeData?.problemDesscription :question?.problemDesscription}}></p>

      {question?.codeData?.testCases.length>0 ?
      (
         <div className='text-white-400'>
         {question?.codeData?.testCases.map((testCase,index)=>(
            <div className='flex flex-col gap-3 mt-3'>
             <span className=' capitalize text-white font-bold'>Input:{index+1}</span>
             {testCase?.inputs.map((input,index)=>(
                 <>
                  <p>{input?.value}</p> 
                 </>
             ))}
               <span>Output:{testCase?.output}</span>
            </div>
            
         ))}
     </div>
      ):
      (
        <div className='text-white-400'>
        {question?.testCases.map((testCase,index)=>(
           <div className='flex flex-col gap-3 mt-3'>
            <span className=' capitalize text-white font-bold'>Input:{index+1}</span>
            {testCase?.inputs.map((input,index)=>(
                <>
                 <p>{input?.value}</p> 
                </>
            ))}
              <span>Output:{testCase?.output}</span>
           </div>
           
        ))}
    </div>
      )}
       

      </div>
    </div>
  );
};

export default Question;
