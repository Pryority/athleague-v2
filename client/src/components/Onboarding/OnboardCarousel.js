import React from 'react'

export default function OnboardCarousel() {
    return (
        <div className='flex flex-col h-screen w-full justify-center items-center bg-teal-200'>
            <div className='flex w-full bg-green-400 h-2/3' />
            <div className='flex flex-col h-1/3 items-center justify-center w-5/6 space-y-2'>
                <p className='text-3xl font-bold text-center'>Create Activity Circuits</p>
                <p className='text-lg text-center leading-1'>Place checkpoints at desired locations to build your own adventure.</p>
            </div>
        </div>
    )
}
