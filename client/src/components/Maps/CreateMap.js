import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios';
const TOKEN = process.env.REACT_APP_MAPBOX;

export default function CreateMap() {
    const [viewState, setViewState] = useState({
        latitude: 20,
        longitude: -81,
        zoom: 5
    });
    const [checkpoints, setCheckpoints] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [selectedCP, setSelectedCP] = useState({});
    const mapRef = useRef();
    const handleMarkerClick = (cp, lat, long) => {
        setSelectedCP(cp);
        setViewState({
            latitude: lat,
            longitude: long
        })
        console.log(`Current Course ID: ${selectedCP}`)
        console.log(`Course Coordinates: \n Lat-${lat} Long-${long}`)
    }

    const saveCourse = async (lat, lng) => {
        try {
            const res = await axios.post('/api/courses', {
                "username": "<USERNAME>",
                "title": "<TITLE>",
                "type": "<TYPE>",
                "desc": "<DESCRIPTION>",
                "rating": 5,
                "lat": lat,
                "long": lng
            })
            console.log('🟢 COURSES:', res.data)
            // setCourses(res.data)
        } catch (err) {
            console.log('<><><><><><><>', err, '<><><><><><><>')
        }
    }

    const handleAddMarker = async (loc) => {
        console.log('Location:', loc)
        const checkpoint = {
            "username": "<asdf>",
            "title": "<asdf>",
            "type": "<asdf>",
            "desc": "<asdf>",
            "rating": 5,
            "lat": loc.lat,
            "long": loc.long
        }
        checkpoints.push(checkpoint)
        console.log('🟢 COURSES:', checkpoints)
    };

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await axios.get('/api/new-course')
                console.log('🟢 COURSES:', res.data)
                setCheckpoints(res.data)
            } catch (err) {
                console.log('<><><><><><><>', err, '<><><><><><><>')
            }
        };
        getCourses();
    }, [])

    return (
        <Map
            {...viewState}
            ref={mapRef}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={TOKEN}
            // mapStyle="mapbox://styles/matthewpryor/ckzepsxne002b14ov4oo7gb8r"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            className='relative'
            onClick={(e) => {
                handleAddMarker({ lat: e.lngLat.lat, long: e.lngLat.lng })

            }}
        >
            {
                checkpoints.map((marker, index, key) => {
                    return (
                        <>
                            <Marker
                                key={index}
                                latitude={marker.lat}
                                longitude={marker.long}
                                anchor="top"
                                offset={[-5, -20]}
                                scale={2}
                            >
                                {
                                    (index === 0) ?
                                        // START
                                        <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/80 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/80 border-2 border-lime-200/80 hover:border-lime-200/70 justify-center items-center animate-pulse'
                                            onClick={() => handleMarkerClick(marker, marker.lat, marker.long)}
                                        >
                                            <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                {index + 1}
                                            </div>
                                        </div>
                                        :
                                        (index === checkpoints.length - 1) ?
                                            // FINISH
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/80 hover:from-yellow-500/70 hover:to-yellow-500/70 to-yellow-500/80 border-2 border-yellow-200/80 hover:border-yellow-200/70 justify-center items-center animate-pulse'
                                                onClick={() => handleMarkerClick(marker, marker.lat, marker.long)}
                                            >
                                                <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                    {index + 1}
                                                </div>
                                            </div>
                                            :
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-br from-sky-500/80 hover:from-blue-500/70 hover:to-sky-500/70 to-blue-500/80 border-2 border-blue-200/80 hover:border-sky-200/70 justify-center items-center animate-pulse'
                                                onClick={() => handleMarkerClick(marker, marker.lat, marker.long)}
                                            >
                                                <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                    {index + 1}
                                                </div>
                                            </div>
                                }
                            </Marker>

                            {
                                selectedCP.long === marker.long && (
                                    <Popup
                                        latitude={marker.lat}
                                        longitude={marker.long}
                                        anchor="bottom"
                                        closeButton={false}
                                        closeOnClick={false}
                                        offset={[-10, -40]}
                                    >
                                        <div className='flex flex-col space-y-2 w-full items-center'>
                                            <p className='flex w-full text-sm text-center'>{`Update Checkpoint: ${(index + 1)} to be`}</p>
                                            <div className='flex justify-around w-full'>
                                                <div className='bg-green-400 px-2 rounded-sm font-medium'>
                                                    Start
                                                </div>
                                                <div className='bg-yellow-400 px-2 rounded-sm font-medium'>
                                                    Finish
                                                </div>
                                            </div>
                                        </div>

                                    </Popup>
                                )
                            }
                        </>
                    )
                })
            }

            <div id='filter-menu' className='flex w-full justify-center items-center absolute top-4 z-50' >
                <div className='flex w-5/6 justify-center items-start h-full absolute'>
                    <div className='flex flex-col space-y-2 w-full items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-800/30 shadow'>
                        <div
                            className='flex flex-col w-full items-center'
                        >
                            <div className='flex w-full space-x-2'>
                                <div id='filter'
                                    onClick={() => {
                                        console.log('clicked')
                                        setToggle(!toggle)
                                        console.log(toggle)
                                    }}
                                    className='flex space-x-1 h-full p-2 items-center rounded-lg bg-sky-100 border-2 border-slate-400'>
                                    <FilterAltIcon fontSize='small' />
                                    <p className='font-medium text-md text-slate-700'>Filter</p>
                                    <KeyboardArrowDownIcon fontSize='small' />
                                </div>
                                {/* GEOCODER */}

                                <input id='geocode-search' placeholder='Search by location' className='flex  flex-col w-full z-50 rounded-lg p-2 border-2 border-slate-400' />
                                <div className='flex p-2 justify-end'>
                                    <AutorenewIcon fontSize='small' />
                                </div>
                            </div>

                            {toggle && (<div className='flex flex-col w-full justify-around items-around'>
                                <div className='grid grid-cols-2 mt-4 items-center gap-2 w-full'>
                                    <div className='flex w-full flex-col'>
                                        <p className='text-slate-700 font-medium'>Distance</p>
                                        <div className='flex border border-slate-400 rounded-lg'>
                                            <input placeholder='Min' className='flex w-full p-1 px-2 rounded-l-lg' />
                                            <div className='border' />
                                            <input placeholder='Max' className='flex w-full p-1 px-2 rounded-r-lg' />
                                        </div>
                                    </div>

                                    <div className='flex w-full flex-col'>
                                        <p className='text-slate-700 font-medium'>Completions</p>
                                        <div className='flex border border-slate-400 rounded-lg'>
                                            <input placeholder='Min' className='flex w-full p-1 px-2 rounded-l-lg' />
                                            <div className='border' />
                                            <input placeholder='Max' className='flex w-full p-1 px-2 rounded-r-lg' />
                                        </div>
                                    </div>


                                    <div className='flex w-full flex-col'>
                                        <p className='text-slate-700 font-medium'>Type</p>
                                        <div className='flex border border-slate-400 rounded-lg'>
                                            <select name='type' className='flex w-full p-1 px-2 rounded-lg' />
                                        </div>
                                    </div>

                                    <div className='flex w-full flex-col'>
                                        <p className='text-slate-700 font-medium'>Completions</p>
                                        <div className='flex border border-slate-400 rounded-lg'>
                                            <input placeholder='Min' className='flex w-full p-1 px-2 rounded-l-lg' />
                                            <div className='border' />
                                            <input placeholder='Max' className='flex w-full p-1 px-2 rounded-r-lg' />
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div >
            <div id='HUD' className='flex w-full justify-center items-center absolute bottom-12 z-50' >
                <div className='flex w-full absolute justify-center space-x-2 items-center'>
                    <div className='flex space-x-1'>
                        <div className='flex flex-col w-12 h-12 space-y-2 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow text-2xl font-black'
                            onClick={() => {
                                console.log('Deleting previous')
                                checkpoints.pop();
                            }}
                        >
                            <UndoIcon />
                        </div>
                        <div className='flex flex-col w-12 h-12 space-y-2 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow text-2xl font-black opacity-50'>
                            <RedoIcon />
                        </div>
                    </div>
                    <div className='flex flex-col w-16 h-16 space-y-2 justify-center items-center bg-gradient-to-r from-lime-500 to-yellow-500 p-3 rounded-full border-2 border-stone-200 shadow text-4xl font-black'>
                        <ControlPointIcon className='scale-150' />
                    </div>
                    <div className='flex space-x-1'>
                        <div className='flex flex-col w-24 h-12 space-y-2 justify-center items-center bg-red-200 p-3 rounded-xl border-2 border-red-300 shadow text-2xl font-black'
                        >
                            <DeleteForeverIcon />
                        </div>
                        {/* <div className='flex flex-col w-12 h-12 space-y-2 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-800/30 shadow text-2xl font-black opacity-0'>
                            ↪️
                        </div> */}
                    </div>
                </div>
            </div>
        </Map >
    )
}