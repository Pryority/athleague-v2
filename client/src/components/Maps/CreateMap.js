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
import trail from '../../assets/images/trail.png'
import demo from '../../assets/images/demo.png'

import axios from 'axios';
const TOKEN = process.env.REACT_APP_MAPBOX;

export default function CreateMap() {
    const [viewState, setViewState] = useState({
        latitude: 49.29837092831224,
        longitude: -122.93407397752691,
        zoom: 10.647035651394196
    });
    const [checkpoints, setCheckpoints] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [selectedCP, setSelectedCP] = useState({});
    const [showIntro, setShowIntro] = useState(true);

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
            console.log('🟢 CHECKPOINTS:', res.data)
            // setCourses(res.data)
        } catch (err) {
            console.log('<><><><><><><>', err, '<><><><><><><>')
        }
    }

    const handleAddMarker = (loc) => {
        // console.log('Location:', loc)
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
        console.log('Adding Marker -- UPDATED CHECKPOINTS ARRAY:', checkpoints)
    };

    useEffect(() => {
        // const getCourses = async () => {
        //     try {
        //         const res = await axios.get('/api/new-course')
        //         console.log('🟢 CHECKPOINTS:', res.data)
        //         setCheckpoints(res.data)
        //     } catch (err) {
        //         console.log('<><><><><><><>', err, '<><><><><><><>')
        //     }
        // };
        // getCourses();
        setCheckpoints(checkpoints)
        console.log(checkpoints)
        console.log(viewState)
    }, [viewState, checkpoints])

    return (
        <Map
            {...viewState}
            ref={mapRef}
            onMove={(e) => setViewState(e.viewState)}
            mapboxAccessToken={TOKEN}
            // mapStyle="mapbox://styles/matthewpryor/ckzepsxne002b14ov4oo7gb8r"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            className='relative'
            minZoom={2}
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
                                        closeButton={true}
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

            <div id='filter-menu' className='flex w-full justify-center items-center absolute top-4 z-2' >
                <div className='flex w-5/6 justify-center items-start h-full absolute'>
                    <div className='flex flex-col space-y-2 w-full items-center bg-slate-200/90 p-3 rounded-xl border-2 border-slate-800/30 shadow'>
                        <div
                            className='flex flex-col w-full items-center'
                        >
                            <div className='flex w-full space-x-2'>
                                <input id='geocode-search' placeholder='Search by location' className='flex  flex-col w-full z-2 rounded-lg p-2 border-2 border-slate-400' />
                                <div className='flex p-2 justify-end'>
                                    <AutorenewIcon fontSize='small' />
                                </div>
                            </div>

                            <div className='flex flex-col w-full p-2 rounded-md items-center justify-center mt-2'>
                                <div className='flex space-x-8'>
                                    <p>Latitude: <b>{viewState.latitude.toFixed(4)}</b></p>
                                    <p>Longitude: <b>{viewState.longitude.toFixed(4)}</b></p>
                                </div>
                                <div className='border-b border-slate-300 flex w-2/3' />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div id='HUD' className='flex flex-col space-y-2 w-full justify-around items-center absolute bottom-12' >
                <div className='flex flex-wrap justify-center gap-2 w-full'>
                    {checkpoints.map((checkpoint, index) => (
                        // <div className='rounded-full border shadow w-8 h-8 bg-slate-500' />
                        <>
                            {
                                (index === 0) ?
                                    // START
                                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/80 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/80 border-2 border-lime-200/80 hover:border-lime-200/70 justify-center items-center'
                                        onClick={() => setViewState({ latitude: checkpoint.lat, longitude: checkpoint.long })}
                                    >
                                        <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                            {index + 1}
                                        </div>
                                    </div>
                                    :
                                    (index === checkpoints.length - 1) ?
                                        // FINISH
                                        <div className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/80 hover:from-yellow-500/70 hover:to-yellow-500/70 to-yellow-500/80 border-2 border-yellow-200/80 hover:border-yellow-200/70 justify-center items-center'
                                            onClick={() => setViewState({ latitude: checkpoint.lat, longitude: checkpoint.long })}
                                        >
                                            <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                {index + 1}
                                            </div>
                                        </div>
                                        :
                                        <div className='h-10 w-10 rounded-full bg-gradient-to-br from-sky-500/80 hover:from-blue-500/70 hover:to-sky-500/70 to-blue-500/80 border-2 border-blue-200/80 hover:border-sky-200/70 justify-center items-center'
                                            onClick={() => setViewState({ latitude: checkpoint.lat, longitude: checkpoint.long })}
                                        >
                                            <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                {index + 1}
                                            </div>
                                        </div>
                            }
                        </>
                    ))}
                    {/* </div> */}
                </div>
                <div className='flex w-full justify-center space-x-2 items-center'>
                    <div className='flex space-x-1'>
                        {
                            (checkpoints.length === 0) ? (
                                <div className='flex flex-col w-12 h-12 space-y-2 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black
                                opacity-50'
                                >
                                    <UndoIcon />
                                </div>
                            )
                                :
                                <div className='flex flex-col w-12 h-12 space-y-2 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black'
                                    onClick={() => {
                                        checkpoints.pop();
                                        console.log('Deleting previous Checkpoint -- UPDATED CHECKPOINTS ARRAY', checkpoints)
                                    }}
                                >
                                    <UndoIcon />
                                </div>
                        }

                        <div className='flex flex-col w-12 h-12 space-y-2 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black opacity-50'>
                            <RedoIcon />
                        </div>
                    </div>
                    <div className='flex flex-col w-16 h-16 space-y-2 justify-center items-center bg-gradient-to-r from-lime-500 to-green-500 p-3 rounded-full border-2 border-stone-200 shadow-md text-4xl font-black'>
                        <ControlPointIcon className='scale-150' style={{ fill: '#ffffff' }} />
                    </div>
                    <div className='flex space-x-1'>
                        <div className='flex flex-col w-24 h-12 space-y-2 justify-center items-center bg-red-200 p-3 rounded-xl border-2 border-red-300 shadow-md text-2xl font-black'
                        >
                            <DeleteForeverIcon style={{ fill: '#b02727' }} />
                        </div>
                    </div>
                </div>
            </div>
            {showIntro && (
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
                                    console.log('clicked')
                                    setShowIntro(!showIntro)
                                    console.log(showIntro)
                                }}>
                                Next
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Map >
    )
}