import React, { useContext, useEffect, useState } from 'react'
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutorenewIcon from '@mui/icons-material/Autorenew';

// import { Button } from '@mui/material';
import axios from 'axios';
const TOKEN = process.env.REACT_APP_MAPBOX;
// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//         { type: 'Feature', geometry: { type: 'Point', coordinates: [-81, 40] } }
//     ]
// };

// const layerStyle = {
//     id: 'point',
//     type: 'circle',
//     paint: {
//         'circle-radius': 10,
//         'circle-color': '#007cbf'
//     }
// };

export default function CreateMap() {
    const [viewState, setViewState] = useState({
        latitude: 20,
        longitude: -81,
        zoom: 5
    });
    const [courses, setCourses] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [newCourse, setNewCourse] = useState(null)
    const [currentCourseId, setCurrentCourseId] = useState(null);

    const handleMarkerClick = (id, lat, long) => {
        setCurrentCourseId(id);
        setViewState({
            latitude: lat,
            longitude: long
        })
        console.log(`Current Course ID: ${currentCourseId}`)
        console.log(`Course Coordinates: Lat-${lat} Long-${long}`)
    }

    const handleAddMarker = (lat, lng) => {
        console.log('test', lat)
        setNewCourse({
            lat,
            lng
        })
    };

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await axios.get('/api/courses')
                console.log('🟢 COURSES:', res.data)
                setCourses(res.data)
            } catch (err) {
                console.log('<><><><><><><>', err, '<><><><><><><>')
            }
        };
        getCourses();
    }, [])

    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={TOKEN}
            // mapStyle="mapbox://styles/matthewpryor/ckzepsxne002b14ov4oo7gb8r"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            className='relative'
            onClick={(e) => handleAddMarker({ lat: e.lngLat.lat, long: e.lngLat.lng })}
        >
            {
                courses.map((marker, index, key) => {
                    return (
                        <>
                            <Marker
                                key={index}
                                latitude={marker.lat}
                                longitude={marker.long}
                                anchor="right"
                                offset={0}
                                scale={2}
                            >
                                <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/80 hover:from-lime-500/70 hover:to-green-500/70 to-green-500/80 border-2 border-lime-200/80 hover:border-lime-200/70'
                                    onClick={() => handleMarkerClick(marker._id, marker.lat, marker.long)}
                                />
                            </Marker>

                            {
                                currentCourseId === marker._id && (
                                    <Popup
                                        latitude={marker.lat}
                                        longitude={marker.long}
                                        anchor="left"
                                        closeButton={true}
                                        closeOnClick={false}
                                        onClose={() => setCurrentCourseId(null)}
                                    >
                                        <div className='w-full'>
                                            <img src='https://www.seguin.ca/en/explore-play/resources/Pictures/11140305_bn_seguin-interiors_0052_bike-on-trail.jpg' alt='trail-demo' className='rounded-md mb-2' />
                                            <h4 className='text-xl font-bold'>{marker.title}</h4>
                                            <div className='border-b mb-2' />
                                            <div className='flex space-x-2 items-center text-md space-between justify-between'>
                                                <p className='text-md'>Type:</p>
                                                <p className='font-medium text-slate-900 capitalize text-sm'>{marker.type}</p>
                                            </div>
                                            <div className='flex space-x-2 items-center text-md space-between justify-between'>
                                                <p className='text-md'>Completions:</p>
                                                <p className='font-medium text-slate-900 capitalize text-sm'>513</p>
                                            </div>
                                            <div className='flex space-x-2 items-center text-md space-between justify-between'>
                                                <p className='text-md'>Distance:</p>
                                                <p className='font-medium text-slate-900 capitalize text-sm'>8 km</p>
                                            </div>
                                            <div className='flex space-x-2 items-center text-md space-between justify-between'>
                                                <p className='text-md'>Creator:</p>
                                                <p className='font-medium text-slate-900 capitalize text-sm'>{marker.username}</p>
                                            </div>
                                            <div className='flex w-full justify-center mt-4'>
                                                <button className='flex w-full items-center justify-center bg-blue-500 border hover:border-slate-300 text-white p-1 px-2 rounded-md'
                                                    onClick={() => console.log(`Viewing ${marker.title} `)}
                                                >
                                                    View Course
                                                </button>
                                                <div className='flex items-center px-2'>
                                                    <BookmarkIcon color="primary"
                                                        onClick={() => console.log(`Saving ${marker.title} to Favorites!`)}
                                                    />
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

            < div className='flex w-full justify-center items-center absolute top-4 z-50' >
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
                                <input placeholder='Search by location' className='flex  flex-col w-full z-50 rounded-lg p-2 border-2 border-slate-400' />
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


                        {/* SPACER */}
                        {/* <div className='flex w-1 /5'>
                                    <div className='h-12 w-12 bg-clear rounded-full' />
                                </div> */}
                    </div>
                </div>
            </div >
            {/* {courseMarkers} */}
            {/* <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source> */}

        </Map >
    )
}