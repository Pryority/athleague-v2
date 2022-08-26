import React from 'react'
import demo from '../../assets/images/demo.png'
import recents from './RecentlyCreated.json'

function Home() {
    return (
        <div className='flex flex-col w-full justify-start items-center space-y-1 p-2 bg-slate-400 h-full'>
            <div className='flex w-full space-x-4 items-center justify-start'>
                <div className='flex items-center space-x-2 bg-red-700 rounded-full p-1 px-3'>
                    <p className='font-bold text-stone-50'>LIVE</p>
                    <div className='h-3 w-3 bg-stone-50 rounded-full' />
                </div>
                <p>home</p>
                <p>create</p>
                <p>profile</p>
            </div>
            <p className='flex w-full justify-center items-center text-2xl text-center font-medium lg:text-4xl'>
                Recently Created
            </p>
            <div className='grid grid-cols-2 w-full justify-center items-center gap-2'>
                {recents.map((recent, i) => (
                    <div className='flex flex-col justify-center items-center rounded-xl bg-orange-400 border-2 border-stone-50'>
                        <div className='flex w-full'>
                            <img src={demo} className='object-contain h-full w-full rounded-xl border-b-2' alt='demo-image' />
                        </div>
                        <div className='flex w-full justify-center p-2'>
                            <div className='flex flex-col md:flex-row w-full justify-center p-2 bg-purple-400'>
                                <div className='flex flex-col w-full bg-green-400'>
                                    {/* <img src={imageURL + `${i}.png`} alt='demo-image' /> */}
                                    <div className='flex w-full'>
                                        {/* <p className='text-end'>Checkpoints</p> */}
                                        <p className='text-end w-full'>{recent.checkpoints.length} Waypoints</p>
                                    </div>
                                    <p className='text-end'>{recent.distance} km</p>
                                </div>
                                <div className='flex flex-col w-full bg-green-400'>
                                    {/* <img src={imageURL + `${i}.png`} alt='demo-image' /> */}
                                    <div className='flex w-full'>
                                        {/* <p className='text-end'>Checkpoints</p> */}
                                        <p className='text-end w-full'>Adventure</p>
                                    </div>
                                    <p className='text-end'>By:  {recent.createdBy}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home