import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichText from '@/utils/RichText';
import TestCases from '@/utils/Testcases';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostContestCodes = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        problemName: '',
        problemType: '',
        problemDiffcuilty: '',
        problemDesscription: '',
        image: '',
        testCases: [],
        contestName:'',
        startDate:'',
        endDate:'',
        avgTime:0,
        problemScore:0
    });

    const handleTestCases = (newTestCases) => {
        setData((prevData) => ({
            ...prevData,
            testCases: newTestCases,
        }));
    };

    const handleChange = (name, val) => { // here i handling input to store in state
        setData((prevData) => ({
            ...prevData,
            [name]: val,
        }));
    };

    const handleFileChange = (e) => {// here i handling the file 
        setSelectedFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url);
        handleChange('image', url);
    };

    async function handleSubmit() {
        setLoading(true);
         try{
               const response=await fetch('http://localhost:4000/api/storeContestCode',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({contest:data})
               })
                    const resData=await response.json();
                    console.log(resData);
         }catch(err){
            console.log(err.message)
         }finally{
            setLoading(false);
         }
    }

    return (
        <div className='w-full lg:w-[85%] min-h-screen'>
            <div className='w-full p-5 lg:p-16 sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-20'>
            <div className='flex flex-col sm:gap-0 lg:gap-2  '>
                    <label className='text-white heading4'>ContestName</label>
                    <Input type='text' placeholder='ContestName' value={data.contestName} onChange={(e) => handleChange('contestName', e.target.value)} className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>
                <div className='flex flex-col sm:gap-0 lg:gap-2 '>
                    <label className='text-white heading4'>ContestName</label>
                    <Input type='number' placeholder='ContestName' value={data.problemScore} onChange={(e) => handleChange('problemScore', e.target.value)} className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>
                <div className='flex flex-col sm:gap-0 lg:gap-2 '>
                    <label className='text-white heading4'>Problem Name</label>
                    <Input type='text' placeholder='Problem Name' value={data.problemName} onChange={(e) => handleChange('problemName', e.target.value)} className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>

                <div className='flex flex-col gap-2  lg:w-full '>
                    <label className='text-white heading4'>Problem Type</label>
                    <Input type='text' placeholder='Array...' value={data.problemType} onChange={(e) => handleChange('problemType', e.target.value)} className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-white heading4'>Problem Difficulty</label>
                    <Input type='text' placeholder='easy, medium, hard...' value={data.problemDiffcuilty} onChange={(e) => handleChange('problemDiffcuilty', e.target.value)} className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-white heading4'>Avg Time to Solve</label>
                    <Input type='number' value={data.avgTime} onChange={(e) => handleChange('avgTime', e.target.value)} placeholder='20min' className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-white heading4'>startDate</label>
                    <Input type='datetime-local' value={data.startDate} onChange={(e) => handleChange('startDate', e.target.value)} placeholder='20min' className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-white heading4'>Avg Time to Solve</label>
                    <Input type='datetime-local' value={data.endDate} onChange={(e) => handleChange('endDate', e.target.value)} placeholder='20min' className='outline:none bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4' />
                </div>

                <div className='flex flex-col gap-2 col-span-2 text-white text-xl'>
                    <label className='text-white heading4'>Problem Description</label>
                    <RichText className='h-64' handleChange={handleChange} />
                </div>

                <div className='col-span-2'>
                    <TestCases handleTestCases={handleTestCases} />
                </div>

                <div className='col-span-2'>
                    <div className="p-8 border-2 border-black-300 flex flex-col rounded-lg items-center justify-center">
                        <h2 className="text-2xl text-white mb-6">Upload an Image</h2>
                        <Input type="file" onChange={handleFileChange} className="hidden" />
                        <label className="px-4 py-2 bg-green-600 text-white rounded mt-4 cursor-pointer" onClick={() => document.querySelector('input[type=file]').click()}>
                            Select Image
                        </label>
                        {imageUrl && (
                            <div className="mt-8">
                                <h3 className="text-xl text-white mb-4">Uploaded Image:</h3>
                                <img src={imageUrl} alt="Uploaded" className="max-w-full h-[400px]" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex justify-start p-5 lg:p-10'>
                {loading ? (
                    <Button type='button' className='cursor-pointer w-[90px] h-[60px] font-semibold text-xl'>
                        <LoaderCircle className='animate-spin' />
                    </Button>
                ) : (
                    <Button type='button' className='cursor-pointer w-[90px] h-[60px] font-semibold text-xl' onClick={handleSubmit}>
                        Save
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PostContestCodes;
