import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProblemsList = ({ problem, setProblems }) => {

    async function handledelete(id){
        try{
            const response=await fetch(`http://localhost:4000/api/delete/deleteCode/${id}`,{
                method:'DELETE'
            })
              const data=await response.json();
              if(!data.error)
              {
                setProblems(data);
                return;
              }

        }catch(err){
            console.log(err.message)
        }

    }
    

    return (
        <Card className='border-2 border-black-400 h-auto w-auto cursor-pointer hover:shadow-lime-100'>
            <CardHeader>
                <CardTitle><p className='text-2xl lg:text-3xl text-white-400'>{problem?.codeData?.problemName}</p></CardTitle>
                <CardDescription>
                    <p dangerouslySetInnerHTML={{ __html: problem?.codeData?. problemDesscription }} className='text-xl lg:text-2xl text-white-400'></p>
                </CardDescription>
            </CardHeader>
            <div className='flex-between'>
            <CardContent>
                <p className='text-white text-sm'><span className='text-sm'>problemDiffcuilty :</span> {problem?.codeData?. problemDiffcuilty}</p>
            </CardContent>
            <CardContent>
                <p className='text-white text-sm'><span className='text-md'>AvgTime:</span> {problem?.codeData?. avgTime} min</p>
            </CardContent>
            </div>
            <CardFooter className='flex w-full gap-5'>
               <Trash2 className='text-red-700 cursor-pointer' onClick={()=>handledelete(problem._id)}/>
              <Link to={`/update-code/${problem._id}`}> <Pencil className='text-white-800 cursor-pointer'/></Link>
            </CardFooter>
        </Card>
    );
}

export default ProblemsList;
