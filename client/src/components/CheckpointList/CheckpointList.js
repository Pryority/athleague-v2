import React from 'react'

export default function CheckpointList() {
    return (
        <div
            id='checkpoint-list'
            className=' w-full inline-flex items-center -space-x-px justify-center gap-2 p-4 mb-16'
        >
            <p className='bg-green-400 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-700 font-medium'>1</p>
            <p className='bg-slate-200 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-700 font-medium'>2</p>
            <p className='bg-slate-200 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-700 font-medium'>3</p>
            <p className='bg-yellow-400 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-700 font-medium'>4</p>
        </div>
    )
}
