import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({
    username: '',
    password:''
  });
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
     try{
           const response=await fetch('http://localhost:4000/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(form)
           })
              const resData=await response.json();
              if(!resData.error)
                navigate('/')
     }catch(err){
       console.log(err.message);
     }finally{
        setLoading(false);
     }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/5e9aa66fd3886aa2b4ec01ca/647bed576280c5b1cbc5eac1_faang%20companies.png)' }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
           {loading ? (<button type='submit'  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
           <div className='flex justify-center'> <LoaderCircle className='animate-spin '/></div>
          </button>):(<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
            Sign Up
          </button>)}
        </form>
        <div className='mt-5 text-center'>
          <p className='font-bold text-dark-layer-2'>If you not  register <Link to={'/signin'}><span className='text-blue-600 cursor-pointer'>signup</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
