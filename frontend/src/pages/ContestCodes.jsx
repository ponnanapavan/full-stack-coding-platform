import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContestList from './ContestList';
import { Button } from '@/components/ui/button';

const ContestCodes = () => {
    const { contestName } = useParams();
    const [contestData, setContestData] = useState(null); // Initialize with null for clarity

    useEffect(() => {
        async function fetchContestData() {
            try {
                const response = await fetch(`http://localhost:4000/api/getContestCodes/${contestName}`, {
                    method: 'GET'
                });
                const resData = await response.json();
                setContestData(resData);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchContestData();
    }, [contestName]);

    if (!contestData) {
        return <div>Loading...</div>;
    }

    const currentTime = new Date();// it will give current object with time and date
    const startDate = new Date(contestData.startDate); //it will convert into date object

    const endDate = new Date(contestData.endDate);

    const isContestActive = currentTime >= startDate ;// this condition is used to hidden the problems upto contest started 

    return (
        <div className='mt-24'>
       {contestData &&  <div className='flex flex-end pr-2'> <Link to={`/leaderboard/${contestData.contestName}`}><Button className='bg-green-200 text-green-900 font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'>LeaderBoard</Button></Link> </div> }
            {isContestActive ? (
                contestData.contest?.length > 0 ? (
                    <div className='w-full grid grid-cols-1 lg:grid-cols-3 mt-14 gap-6 p-10'>
                        {contestData.contest.map((contest, index) => (
                            <div key={index} className='cursor-pointer'>
                                <ContestList contest={contest} problemName={contest.problemName} contestName={contestData.contestName}  />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No contests available.</div>
                )
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center bg-gray-100 p-10 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Contest Not Active</h2>
                        <p className="text-lg">The Contest not yet started. Please check back later. <span className='text-2xl'>😒😒😒</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContestCodes;
