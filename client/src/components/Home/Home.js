import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import demo from '../../assets/images/demo.png'
import recents from './RecentlyCreated.json'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Home() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className='flex flex-col w-full items-center'>
            <div className='flex fixed w-full space-x-8 items-center justify-start bg-slate-50 z-10  p-2 border-b-2 shadow-sm'>
                <Link to='/current' className='flex items-center space-x-2 bg-red-700 rounded-full p-1 px-3 animate-pulse'>

                    <p className='font-bold text-stone-50'>LIVE</p>
                    <div className='h-3 w-3 bg-stone-50 rounded-full' />
                </Link>
                <span className='w-full' />
                <Link to="/create">create</Link>
                <div className='flex items-center space-x-2'>
                    <p>profile</p>
                    <div className='w-6 h-6 bg-black rounded-full' />
                </div>
            </div>

            <div className='flex flex-col space-y-2 w-full px-2 justify-center items-center mt-24'>
                <h1 className='text-2xl lg:text-4xl font-bold text-slate-900'>Welcome to the Athleague</h1>
                <p className='mx-8 text-sm text-center text-slate-600'>Create easy goals for improving fitness and share them with friends.</p>
            </div>

            <a href='#course-preview' className='flex flex-col w-full justify-center items-center pt-8 mb-16 opacity-50 animate-slow-fade-in-up '>
                <p className='text-slate-500'>View courses</p>
                <KeyboardArrowDownIcon style={{ "opacity": "25%" }} />
            </a>

            <div id='course-preview' className='container w-full lg:w-2/3 h-full justify-between animate-fade-in-down'>
                {/* RECENTLY CREATED COURSES SECTION */}
                <div id='recently-created' className='flex flex-col justify-between h-full w-full'>
                    <div className='flex w-full items-center justify-between p-2'>
                        <p className='flex w-full md:w-5/6 text-lg md:text-xl text-start text-stone-600 font-medium lg:text-2xl'>
                            Recently Created
                        </p>
                        <div className='flex w-full space-x-2 items-end justify-end mr-4'>
                            <div className='w-full md:w-2/3 h-[0.62px] bg-stone-200 rounded-full mb-2' />
                            <p className='text-sm w-full md:w-1/5 text-end text-slate-600'>View all</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 w-full h-full justify-center items-center gap-2 z-0 p-2'>
                        {recents.map((recent, i) => (
                            <div className='flex flex-col justify-center items-center rounded-xl border-2 border-stone-50 bg-slate-300 relative h-full'>
                                <div className='flex w-full justify-center h-full items-center'>
                                    {/* <img src={demo} className='object-fit h-full w-full absolute rounded-xl border-b-2' alt='' /> */}
                                    <p>Course image</p>
                                </div>
                                <div className='flex flex-col w-full justify-end items-end p-2 z-50'>
                                    <div className='flex flex-wrap gap-1 w-full'>
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
                                            <div className='flex items-center justify-center bg-slate-800/70 rounded-full px-1'>
                                                <p className='text-end text-[12px] text-stone-50 font-medium p-1 capitalize'>{recent.createdBy}</p>
                                                <div id='profile-picture' className='h-4 w-4 rounded-full bg-stone-300 border' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mt-4 mx-8 border-b border-stone-200 rounded-full' />

                {/* RECENTLY COMPLETED COURSES SECTION */}
                <div id='recently-completed' className='flex flex-col justify-between h-full w-full'>
                    <div className='flex w-full items-center justify-between p-2'>
                        <p className='flex w-full md:w-5/6 text-lg md:text-xl text-start text-stone-600 font-medium lg:text-2xl'>
                            Recently Completed
                        </p>
                        <div className='flex w-full space-x-2 items-end justify-end mr-4'>
                            <div className='w-full md:w-2/3 h-[0.62px] bg-stone-200 rounded-full mb-2' />
                            <p className='text-sm w-full md:w-1/5 text-end text-slate-600'>View all</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 w-full h-full justify-center items-center gap-2 z-0 p-2'>
                        {recents.map((recent, i) => (
                            <div className='flex flex-col justify-center items-center rounded-xl border-2 border-stone-50 bg-slate-300 relative h-full'>
                                <div className='flex w-full justify-center h-full items-center'>
                                    {/* <img src={demo} className='object-fit h-full w-full absolute rounded-xl border-b-2' alt='' /> */}
                                    <p>Course image</p>
                                </div>
                                <div className='flex flex-col w-full justify-end items-end p-2 z-50'>
                                    <div className='flex flex-wrap gap-1 w-full'>
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
                                            <div className='flex items-center justify-center bg-slate-800/70 rounded-full px-1'>
                                                <p className='text-end text-[12px] text-stone-50 font-medium p-1 capitalize'>{recent.createdBy}</p>
                                                <div id='profile-picture' className='h-4 w-4 rounded-full bg-stone-300 border' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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