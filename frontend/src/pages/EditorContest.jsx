import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import contestStarterCode from '@/utils/conteststartedcode';
import { useParams } from 'react-router-dom';

const EditorContest = ({ questionName, problemScore }) => {
  const [code, setCode] = useState(contestStarterCode[questionName] || '');
  const {contestName}=useParams();
  console.log(problemScore,contestName)
  
  const userId=JSON.parse(localStorage.getItem('user'))._id;
  
  const [editorState, setEditorState] = useState({
    language: 'javascript',
    code: '// Write your code here',
    questionName: questionName,
    userId:userId,
    contestName,
    problemScore
  });


  const [loading, setLoading] = useState(false);
  

  const handleChange = (name, value) => {
    setEditorState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
 
    try {
      const response = await fetch('http://localhost:4000/api/contestSubmitCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: editorState.language,
          code: editorState.code,
          questionName,
          contestName,
          userId,
          problemScore
        })
      });
      const resData = await response.json();
      console.log(resData)
      if (resData.success) {
        toast.success("All testCases passed  successfully 🔥🔥🔥");
      } else {
        toast.error("Some test cases failed. Please try again 🥲🥲🥲");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("An error occurred during submission.");
      
    } finally {
      setLoading(false);
    }
  };

  const editorOptions = {
    fontSize: 20,
  };

  return (
    <div className='w-[55%] h-screen mt-24'>
      <div className='p-4'>
        <label htmlFor="language-select" className='text-white text-xl mr-4'>Select Language: </label>
        <select
          id="language-select"
          value={editorState.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className='p-2 text-lg bg-dark-layer-2 text-white border border-gray-600 rounded'
        >
          <option value="javascript">javascript</option>
          <option value="java">java</option>
          <option value="cpp">cpp</option>
        </select>
      </div>
      <Editor
        className='p-4 text-2xl'
        height="75vh"
        language={editorState.language}
        theme="vs-dark"
        options={editorOptions}
        value={code}
        onChange={(value) => handleChange('code', value)}
      />
      <div className='flex justify-start text-2xl mb-5'>
        {loading ? (
          <Button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleSubmit}
          >
            <LoaderCircle className='animate-spin' />
          </Button>
        ) : (
          <Button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </div>
     
    </div>
  );
};

export default EditorContest;
