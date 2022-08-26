import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import demo from '../../assets/images/demo.png'
import recents from './RecentlyCreated.json'

function Home() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className='container w-full bg-stone-100 absolute h-full'>
            <div className='flex fixed w-full space-x-4 items-center justify-start bg-slate-50 z-10  p-2 border-b-2 shadow'>
                <Link to='/current' className='flex items-center space-x-2 bg-red-700 rounded-full p-1 px-3 animate-pulse'>

                    <p className='font-bold text-stone-50'>LIVE</p>
                    <div className='h-3 w-3 bg-stone-50 rounded-full' />
                </Link>
                <Link to='/'><p>home</p></Link>
                <Link to="/create">create</Link>
                <p>profile</p>
            </div>
            <div className='h-full mt-16'>
                <div className='flex w-full justify-start p-2'>
                    <p className='text-2xl text-start font-medium lg:text-4xl'>
                        Recently Created
                    </p>
                </div>
                <div className='grid grid-cols-1 w-full h-full justify-center items-center gap-2 z-0 p-2'>
                    {recents.map((recent, i) => (
                        <div className='flex flex-col justify-center items-center rounded-xl border-2 border-stone-50 relative h-full'>
                            <div className='flex w-full'>
                                <img src={demo} className='object-fit h-full w-full absolute rounded-xl border-b-2' alt='' />
                            </div>
                            <div className='flex flex-col w-full h-full justify-end items-end p-2 z-50'>
                                <div className='flex gap-1 w-full'>
                                    <div className='flex justify-center items-center'>
                                        <div className=' bg-slate-800/70 rounded-full px-1'>
                                            <p className='text-end text-[12px] text-stone-50 font-medium p-1'>{recent.checkpoints.length} Waypoints</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className=' bg-slate-800/70 rounded-full px-1'>
                                            <p className='text-end text-[12px] text-stone-50 font-medium p-1 capitalize'>{recent.type}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className=' bg-slate-800/70 rounded-full px-1'>
                                            <p className='text-end text-[12px] text-stone-50 font-medium p-1'>{recent.distance} km</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className=' bg-slate-800/70 rounded-full px-1'>
                                            <p className='text-end text-[12px] text-stone-50 font-medium p-1 capitalize'>{recent.createdBy}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home


// {showIntro && (
//     // INTRO SCREEN ---------
//     <div id='intro' className='flex w-full justify-center items-center absolute h-screen z-[250] bg-black/80' >
//         <div className='flex justify-center items-center h-full'>
//             <div className='flex flex-col w-5/6 pb-4 space-y-4 justify-center items-center absolute bg-slate-200  rounded-xl border-2 shadow lg:scale-75'>
//                 <img src={demo} className='object-fit w-full p-1 rounded-xl flex lg:object-none lg:h-96' alt='trail' />
//                 <div className='flex flex-col w-full justify-center items-center space-y-1 p-2'>
//                     <p className='flex w-full justify-center items-center text-2xl text-center font-medium lg:text-4xl'>
//                         Welcome to Athleague!
//                     </p>
//                     <p className='flex w-full justify-center items-center text-md text-center font-normal lg:text-xl'>
//                         Create custom activity courses to establish easy goals for improving fitness.
//                     </p>
//                 </div>
//                 <div className='bg-blue-500 px-4 rounded-md text-xl text-slate-100 p-1 lg:p-2 lg:px-6'
//                     onClick={() => {
//                         setShowIntro(!showIntro)
//                     }}>
//                     Next
//                 </div>
//             </div>
//         </div>
//     </div>
// )}