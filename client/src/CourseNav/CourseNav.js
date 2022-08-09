import React from 'react'
import CheckpointList from '../components/CheckpointList/CheckpointList';

export default function CourseNav() {
    return (
        <>
            <div className='flex w-full justify-center p-2'>
                <p className='text-4xl font-medium mt-8'>3:05</p>
            </div>
            <div className='flex w-full h-full items-center justify-center'>
                <p>Course</p>
            </div>
            <CheckpointList />
        </>
    )
}
