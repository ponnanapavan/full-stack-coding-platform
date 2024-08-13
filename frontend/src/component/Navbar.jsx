import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w-full bg-dark-layer-2 border-b-2 border-black-400 max-h-[90px] text-white fixed top-0 left-0 z-50'>
      <div className='flex justify-between items-center p-7  mx-auto'>
        <div>
          <p className='heading2 font-bold text-xl'>CodeJam</p>
        </div>
        <ul className='flex space-x-9 text-lg cursor-pointer'>
         <Link to={'/problems'}> <li className='hover:text-brand-orange-s transition-colors duration-300 font-bold'>Problems</li></Link>
         <Link to={'/Contests'}>  <li className='hover:text-brand-orange-s  transition-colors duration-300 font-bold'>Contests</li></Link>
         <Link to={'/problemssubmissions'}><li className='hover:text-brand-orange-s  transition-colors duration-300 font-bold'>Submissions</li></Link>
          <li className='hover:text-brand-orange-s  transition-colors duration-300 font-bold'>Profile</li>
        </ul>
        <div>
          <Button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300'>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
