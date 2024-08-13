import React, { useEffect, useState } from 'react';
import code from '../assets/code.svg';
import ProblemList from '@/pages/ProblemList';

const Problems = () => {
    const [problems, setProblems] = useState([]);
   
    useEffect(() => {
        async function getProblems() {
            try {
                const response = await fetch('http://localhost:4000/api/getProblems', {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);
                if (data) {
                    setProblems(data); // Directly set the data to state
                }
                console.log(problems.length);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        }
        getProblems();
    }, []);

    return (
        <div className='w-full min-h-screen mt-24'>
            <div className='w-full p-20'>
                <p className='text-xl'>Check Out Popular Problems</p>
                <h1 className='heading3 mt-7 flex items-center gap-4'>
                    Are You Ready to solve Problems 
                    <span>
                        <img src={code} className='h-[40px]' alt="" />
                    </span>
                </h1>
                {problems.length>0 ? 
                (<div className='w-full grid grid-cols-3 mt-14 gap-6'>
                    { problems.map((problem, index) => (
                        <ProblemList problem={problem} key={index}  />
                    ))}
                </div>):
                (<div>' '</div>)
                }
            </div>
        </div>
    );
};

export default Problems;
