import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RichText from '@/utils/RichText'
import TestCases from '@/utils/Testcases'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const UpdateCode = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading,setLoading]=useState(false);
    const [problemdata,setProblemData]=useState({});
    const [updateloading,setUpdateLoading]=useState(false);
   const {id}=useParams();

   const [data,setData]=useState({
    problemName:problemdata?.codeData?.problemName||'',
    problemType:'',
    problemDiffcuilty:'',
    avgTime:0,
    problemDesscription:'',
    image:'',
    testCases:[]
})


   useEffect(()=>{

    async function getProblem(){
      try{
            const result=await fetch(`http://localhost:4000/api/getProblem/${id}`,{
              method:'GET'
            })
            const response=await result.json();
            setData({
              problemName: response?.codeData?.problemName || '',
              problemType: response?.codeData?.problemType || '',
              problemDiffcuilty: response?.codeData?. problemDiffcuilty || '',
              avgTime: response?.codeData?.avgTime || 0,
              problemDesscription: response?.codeData?.problemDesscription || '',
              image: response?.codeData?.image || '',
              testCases: response?.codeData?.testCases 
          });
      }catch(err){

      }

    }
        getProblem();
   },[])
           console.log(data.testCases) 
    
   
    const handleTestCases = (newTestCases) => {
      setData((prevData) => ({
        ...prevData,
        testCases: newTestCases,
      }));
    };

    const handleChange = (name, val) => {
      setData((prevData) => ({
        ...prevData,
        [name]: val,
      }));
           
    };
    const handleFileChange = (e) => {
       
        setSelectedFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
         setImageUrl(url);
         handleChange('image', url);
         
      };

         async function handleSubmit(){
          setUpdateLoading(true);
          try{
            const response=await fetch(`http://localhost:4000/api/UpdateProblem/${id}`,{
              method:'PATCH',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({data})
            })
          }catch(err){
            console.log(err.message)
          }finally{
            setUpdateLoading(false);
          }
         }

  return (
    <div className='sm:w-full lg:w-[85%] min-h-screen'>
    <div className='w-full  p-5 lg:p-10 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-20  '>
       <div className='flex flex-col gap-2 '>
       <label className='text-white heading4'>Problem Name</label>
       <Input type='text' placeholder='Problem Name ' value={data.problemName} onChange={(e)=>handleChange('problemName',e.target.value)} className='outline:none  bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4'/>
       </div>

       <div className='flex flex-col gap-2'>
       <label className='text-white heading4'>Problem Type</label>
       <Input type='text' placeholder='Array... ' value={data.problemType} onChange={(e)=>handleChange('problemType',e.target.value)} className='outline:none  bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4'/>
       </div>

       <div className='flex flex-col gap-2'>
       <label className='text-white heading4'>Problem Diffcuilty</label>
       <Input type='text' placeholder='easy,meduim,hard... ' value={data.problemDiffcuilty} onChange={(e)=>handleChange('problemDiffcuilty',e.target.value)} className='outline:none  bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4'/>
       </div>
       
       <div className='flex flex-col gap-2'>
       <label className='text-white heading4'>Avg Time to Solve</label>
       <Input type='number' value={data.avgTime} onChange={(e)=>handleChange('avgTime',e.target.value)} placeholder='20min ' className='outline:none  bg-black-100 !ring-0 !ring-offset-0 border-2 border-white text-white h-[50px] text-xl p-4'/>
       </div>

       <div className='flex flex-col gap-2 col-span-2 text-white text-xl  '>
       <label className='text-white heading4'>Problem Description</label>
      <RichText className='h-64' handleChange={handleChange} />
    
       </div>

      <div className='col-span-2'>
      <TestCases handleTestCases={handleTestCases}  testCase={data?.testCases}/>
      </div>

      <div className='col-span-2 ]'>
          <div className="p-8  border-2 border-black-300  flex flex-col rounded-lg items-center justify-center ">
      <h2 className="text-2xl text-white mb-6">Upload an Image</h2>
      <Input type="file" onChange={handleFileChange} className="hidden" />
      <label
        className="px-4 py-2 bg-green-600 text-white rounded mt-4 cursor-pointer"
        onClick={() => document.querySelector('input[type=file]').click()}
      >
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

    <div className='flex justify-start p-10 '>
      {updateloading ? ( <Button type='button' className='cursor-pointer w-[90px] h-[60px] font-semibold text-xl'><LoaderCircle className='animate-spin'/></Button>):
      (<Button type='button' className='cursor-pointer w-[90px] h-[60px] font-semibold text-xl' onClick={handleSubmit}>Update</Button>)
      }
     
    </div>
     
    </div>
  )
}

export default UpdateCode
