import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [active, setActive] = useState(1);
    
    return (
        <div className='hidden lg:block w-[15%] min-h-screen border-r-2 border-black-300'>
            <div className='w-full flex flex-col items-center space-y-6 p-6'>
                <Link to='/' onClick={() => setActive(1)} className='w-full'>
                    <div className='w-full text-center p-2 cursor-pointer'>
                        <h2 className={`text-xl text-white ${active === 1 ? 'gradient_blue-purple' : ''}`}>
                            Post a Code
                        </h2>
                    </div>
                </Link>
                <Link to='/posted-codes' onClick={() => setActive(2)} className='w-full'>
                    <div className='w-full text-center p-2 cursor-pointer'>
                        <h2 className={`text-xl text-white ${active === 2 ? 'gradient_blue-purple' : ''}`}>
                            Posted Codes
                        </h2>
                    </div>
                </Link>
                <Link to='/ContestCodes' onClick={() => setActive(3)} className='w-full'>
                    <div className='w-full text-center p-4 cursor-pointer'>
                        <h2 className={`text-xl text-white ${active === 3 ? 'gradient_blue-purple' : ''}`}>
                            PostContestCodes
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideBar;


export const Desktop=()=>{

    return (
        <div className='hidden lg:block w-[15%] min-h-screen border-r-2 border-black-300'>
            <div className='w-full flex flex-col items-center space-y-6 p-10'>
                <Link to='/' onClick={() => setActive(1)} className='w-full'>
                    <div className='w-full text-center p-2 cursor-pointer'>
                        <h2 className={`text-xl text-white ${active === 1 ? 'gradient_blue-purple' : ''}`}>
                            Post a Code
                        </h2>
                    </div>
                </Link>
                <Link to='/posted-codes' onClick={() => setActive(2)} className='w-full'>
                    <div className='w-full text-center p-2 cursor-pointer'>
                        <h2 className={`text-xl text-white ${active === 2 ? 'gradient_blue-purple' : ''}`}>
                            Posted Codes
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    );


}
