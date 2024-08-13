import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LeaderBoard = () => {
    const { contestName } = useParams();
    const [contestScores, setContestScores] = useState([]);

    useEffect(() => {
        async function getContestPersonScores() {
            try {
                const response = await fetch(`http://localhost:4000/api/getContestScore/${contestName}`, {
                    method: 'GET'
                });
                const resData = await response.json();
                console.log(resData)
                setContestScores(resData);
            } catch (err) {
                console.log(err.message);
            }
        }
        getContestPersonScores();
    }, []);

    return (
       <>
       {contestScores.length>0 ? (
        <div className="container mx-auto p-4 mt-24">
        <h1 className="text-2xl font-bold mb-4">Leaderboard for {contestName}</h1>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th className='border-b p-2  text-center'>Rank</th>
                    <th className="border-b p-2  text-center">Username</th>
                  
                    <th className="border-b p-2  text-center">Contest Score</th>

                </tr>
            </thead>
            <tbody>
                {contestScores.map((score, index) => (
                    <tr key={index}>
                        <td className='border-b p-2 text-center'>{index+1}</td>
                        <td className="border-b p-2  text-center">{score.contestSubmissions[0].userData?.username}</td>
                       
                        <td className="border-b p-2  text-center">{score.contestSubmissions[0].contestScore}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
       ): <div>loading....</div>}
       </>
    );
};

export default LeaderBoard;
