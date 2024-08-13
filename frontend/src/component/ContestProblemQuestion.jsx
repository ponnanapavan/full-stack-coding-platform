import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Question from '../pages/Question';
import EditorContest from '@/pages/EditorContest';
const ContestProblemQuestion = () => {
    const { contestName, problemName } = useParams();
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        async function getContestQuestion() {
            try {
                const response = await fetch(`http://localhost:4000/api/getContestCodes/${contestName}`, {
                    method: 'GET'
                });
                const resData = await response.json();
                setQuestions(resData?.contest);
            } catch (err) {
                console.log(err.message);
            }
        }
        getContestQuestion();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const foundQuestion = questions.find(contest => contest.problemName === problemName);
            setQuestion(foundQuestion);
        }
    }, [questions]);

    return (
        <div className='w-full min-h-screen flex'>
            {question && (
                <>
                    <Question question={question} />
                    <EditorContest questionName={problemName} problemScore={question?.problemScore}/>
                   
                </>
            )}
            {!question && <div>Loading...</div>}
        </div>
    );
}

export default ContestProblemQuestion;
