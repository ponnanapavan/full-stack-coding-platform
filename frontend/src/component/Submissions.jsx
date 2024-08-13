import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Submissions = () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const [submissionsData, setSubmissionsData] = useState([]);

    useEffect(() => {
        async function getSubmissionsData() {
            try {
                const response = await fetch(`http://localhost:4000/api/getSubmissions/${userId}`, {
                    method: 'GET'
                });
                const resData = await response.json();
                console.log(resData);
                setSubmissionsData(resData?.submissions);
                console.log(submissionsData);
            } catch (err) {
                console.log(err.message);
            }
        }
        getSubmissionsData();
    }, []);

    const getDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-800';
            case 'medium':
                return 'text-orange-800';
            case 'hard':
                return 'text-red-800';
            default:
                return '';
        }
    };

    return (
        <div className='mt-28'>
            <table className='w-[85%] border-collapse mx-auto rounded-lg'>
                <thead className='bg-gray-200'>
                    <tr>
                        <th className="px-4 py-2 border">ProblemName</th>
                        <th className="px-4 py-2 border">Difficulty</th>
                        <th className="px-4 py-2 border">Acceptance Rate</th>
                        <th className="px-4 py-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {submissionsData && submissionsData.slice().reverse().map((submission, index) => (
                        <tr key={index} className='hover:bg-gray-100 text-center font-bold'>
                            <td className="px-4 py-2 border">
                                <Link to={`/problem/${submission?.problemId?.codeData?.problemName}/${submission?.problemId?._id}`}>
                                    {submission?.problemId?.codeData?.problemName || 'N/A'}
                                </Link>
                            </td>
                            <td className={`px-4 py-2 border ${getDifficultyClass(submission?.problemId?.codeData?.problemDiffcuilty)}`}>
                                {submission?.problemId?.codeData?.problemDiffcuilty || 'N/A'}
                            </td>
                            <td className="px-4 py-2 border">{submission?.problemId?.codeData?.acceptanceRate || 'N/A'}</td>
                            {submission.success ? (
                                <td className="px-4 py-2 border text-green-800">Accepted</td>
                            ) : (
                                <td className="px-4 py-2 border text-red-800">Wrong Answer</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Submissions;
