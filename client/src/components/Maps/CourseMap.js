import React, { useEffect, useState } from 'react'
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
    const [currentCourseId, setCurrentCourseId] = useState(null);

    const centerMap = (lat, long) => {

    }

    const handleMarkerClick = (id, lat, long) => {
        setCurrentCourseId(id);
        setViewState({
            latitude: lat,
            longitude: long
        })
        console.log(`Current Course ID: ${currentCourseId}`)
    }

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
        >

            {courses.map((marker, index, key) => {
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

                        {currentCourseId === marker._id && (
                            < Popup
                                latitude={marker.lat}
                                longitude={marker.long}
                                anchor="left"
                                closeButton={true}
                                closeOnClick={false}
                            >
                                <div className='w-full'>
                                    <img src='https://www.seguin.ca/en/explore-play/resources/Pictures/11140305_bn_seguin-interiors_0052_bike-on-trail.jpg' alt='trail-demo' className='rounded-md mb-2' />
                                    <h4 className='text-xl font-bold'>{marker.title}</h4>
                                    <div className='border-b mb-2' />
                                    <div className='flex space-x-2 items-center text-md space-between justify-between'>
                                        <p className='text-md'>Type:</p>
                                        <p className='font-medium text-slate-900 capitalize text-sm'>Adventure</p>
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
                                            onClick={() => console.log(`Viewing ${marker.title}`)}
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
                            </Popup>)
                        }
                    </>
                )
            })}


            <div className='flex w-full mx-8 justify-center items-start absolute top-12'>
                <div className='flex w-full justify-center items-start absolute'>
                    <div className='flex w-1/5'>
                        <div className='h-10 w-10 bg-red-500 rounded-full border shadow' />
                    </div>
                    <div className='flex flex-col w-3/5 items-center space-y-2'>
                        <input placeholder='Search by location' className='flex w-full z-50 rounded-lg p-2 border shadow' />
                        <div className='flex w-full justify-center space-x-4'>
                            <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
                                Adventure
                            </div>
                            <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
                                Tactical
                            </div>
                            <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
                                Sprint
                            </div>
                            <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
                                Objective
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/5'>
                        <div className='h-12 w-12 bg-clear rounded-full' />
                    </div>
                </div>
            </div>
            {/* {courseMarkers} */}
            {/* <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source> */}
        </Map >
    )
}
