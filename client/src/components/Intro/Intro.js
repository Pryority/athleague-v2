import React, { useState } from 'react'
import demo from '../../assets/images/demo.png'
import { Link } from "react-router-dom";

function Intro() {
    const [showIntro, setShowIntro] = useState(true);
    return (
        <div className='flex w-full justify-center h-full'>
            {!showIntro ? (
                // INTRO SCREEN ---------
                <div id='intro' className='flex w-full justify-center items-center absolute h-full z-100 bg-black/80' >
                    <div className='flex justify-center items-center h-full'>
                        <div className='flex flex-col w-5/6 pb-4 space-y-4 justify-center items-center absolute bg-slate-200  rounded-xl border-2 shadow lg:scale-75'>
                            <img src={demo} className='object-fit w-full p-1 rounded-xl flex lg:object-none lg:h-96' alt='trail' />
                            <div className='flex flex-col w-full justify-center items-center space-y-1 p-2'>
                                <p className='flex w-full justify-center items-center text-2xl text-center font-medium lg:text-4xl'>
                                    Welcome to Athleague!
                                </p>
                                <p className='flex w-full justify-center items-center text-md text-center font-normal lg:text-xl'>
                                    Create custom activity courses to establish easy goals for improving fitness.
                                </p>
                            </div>
                            <div className='bg-blue-500 px-4 rounded-md text-xl text-slate-100 p-1 lg:p-2 lg:px-6'
                                onClick={() => {
                                    setShowIntro(!showIntro)
                                }}>
                                Next
                            </div>
                        </div>
                    </div>
                </div>) :
                // MAIN SCREEN ---------
                (
                    <div id='intro' className='flex w-full justify-center items-center absolute h-full z-100 bg-black/80' >
                        <div className='flex justify-center items-center h-full'>
                            <div className='flex flex-col w-full pb-4 space-y-4 justify-start items-center absolute bg-slate-200 h-full shadow lg:scale-75'>
                                <div className='flex flex-col w-full justify-center items-center space-y-1 p-2'>
                                    <p className='flex w-full justify-center items-center text-2xl text-center font-medium lg:text-4xl'>
                                        Welcome to huh!
                                    </p>
                                    <p className='flex w-full justify-center items-center text-md text-center font-normal lg:text-xl'>
                                        Create custom activity courses to establish easy goals for improving fitness.
                                    </p>
                                </div>
                                <div className='bg-blue-500 px-4 rounded-md text-xl text-slate-100 p-1 lg:p-2 lg:px-6'
                                    onClick={() => {
                                        setShowIntro(!showIntro)
                                    }}>
                                    Next
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Intro