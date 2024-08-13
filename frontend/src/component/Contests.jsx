import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contests = () => {
    const [contestData, setContestData] = useState([]);
    const currentDate = new Date(); //here i get current time and current date 

    useEffect(() => {
        async function getAllContestCodes() {
            try {
                const response = await fetch("http://localhost:4000/api/getContestCodes", {
                    method: 'GET'
                });
                const resData = await response.json();
                setContestData(resData);
            } catch (err) {
                console.log(err.message);
            }
        }
        getAllContestCodes();
    }, []);

    return (
        <div className='w-full min-h-screen mt-24'>
            <div className='w-full  p-4 lg:p-20'>
              
                <p className='text-xl'>Check Out Contests</p>
                
                 <h1 className=' sm:text-sm md:text-xl lg:text-2xl xl:text-3xl mt-7 flex items-center gap-3 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-4'>
    Are You Ready to Solve Contests<span>🔥🔥🔥</span>
</h1>
              
                
                <div className='w-full grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-14 gap-6'>
                    {contestData.length > 0 &&
                        contestData.slice().reverse().map((contest, index) => {
                            const startDate = new Date(contest.startDate);
                            const endDate = new Date(contest.endDate);
                            const formattedDate = startDate.toLocaleDateString();// convert into human readble Date format
                            const formattedTime = startDate.toLocaleTimeString();// convert into human readble time format

                            let contestStatus;
                            let color;
                            if (currentDate < startDate) {
                                contestStatus = "Upcoming"; // Contest hasn't started yet
                               
                            } else if (currentDate >= startDate && currentDate <= endDate) {
                                contestStatus = "Ongoing"; // Contest is currently active
                                color='green-500'
                            } else {
                                contestStatus = "Completed"; // Contest has ended
                                color='red-400'
                            }

                            return (
                                <Link to={`/contest/${contest.contestName}`} key={index}>
                                    <div className= 'bg-black-400  border-2 rounded-lg text-white border-black-200 h-[300px] min-w-[500px]  p-5 lg:p-12 cursor-pointer'>
                                        <div className='flex flex-col gap-7'>
                                            <p className=' text-3xl lg:text-5xl font-bold  '>{contest.contestName}🚀🚀🚀</p>
                                            <p className='text-2xl'>
                                                Start Date: <span className='text-xl'>{formattedDate} at {formattedTime}</span>
                                            </p>
                                            <p className='text-xl font-bold'>Contest Status: <span className={`text-xl text-${color}`}>{contestStatus}</span></p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Contests;
