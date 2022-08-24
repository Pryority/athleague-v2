import React, { useEffect, useRef, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { NavigationControl } from 'react-map-gl';
import { GeolocateControl } from 'react-map-gl';
import { ScaleControl } from 'react-map-gl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TOKEN = process.env.REACT_APP_MAPBOX;

export default function CreateMap() {
    const [viewState, setViewState] = useState({
        latitude: 49.29837092831224,
        longitude: -122.93407397752691,
        zoom: 10.647035651394196
    });
    const [course, setCourse] = useState({
        "username": "matt",
        "title": "",
        "type": "",
        "desc": "",
        "checkpoints": ""
    })
    const [checkpoints, setCheckpoints] = useState([]);
    const [isSelectedCP, setIsSelectedCP] = useState(null);
    const [courseName, setCourseName] = useState('');
    const [showSave, setShowSave] = useState(false);
    const [showQuit, setShowQuit] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);

    const mapRef = useRef();

    const handleMarkerClick = (cp, lat, long) => {
        console.log(cp)
        setIsSelectedCP(true);
        setViewState({
            latitude: lat,
            longitude: long
        })
        console.log(`Current Course ID: ${isSelectedCP}`)
        console.log(`Course Coordinates: \n Lat-${lat} Long-${long}`)
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    let id;
    let target;

    target = {
        latitude: 0,
        longitude: 0
    };

    function success(pos) {
        const crd = pos.coords;
        setCurrentPosition(crd);
        console.log('GeoLocation', currentPosition)
        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
            console.log('Congratulations, you reached the target');
            navigator.geolocation.clearWatch(id);
        }

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    console.log(navigator.geolocation.getCurrentPosition(success, error, options))
    id = navigator.geolocation.watchPosition(success, error, options);
    console.log('ID: ', id)

    useEffect(() => {
    }, [])

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
                                        <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/90 border-2 border-lime-200/90 hover:border-lime-200/70 justify-center items-center'
                                            onClick={() => {
                                                handleMarkerClick(marker, marker.lat, marker.long)
                                            }}
                                        >
                                            <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                {index + 1}
                                            </div>
                                        </div>
                                        :
                                        (index === checkpoints.length - 1) ?
                                            // FINISH
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/90 hover:from-yellow-500/70 hover:to-yellow-500/70 to-yellow-500/90 border-2 border-yellow-200/90 hover:border-yellow-200/70 justify-center items-center'
                                                onClick={() => {
                                                    handleMarkerClick(marker, marker.lat, marker.long)
                                                }}
                                            >
                                                <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                    {index + 1}
                                                </div>
                                            </div>
                                            :
                                            (index === isSelectedCP) ?
                                                <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/90 hover:from-orange-500/70 hover:to-red-500/70 to-lime-500/90 border-2 border-blue-200/90 hover:border-sky-200/70 justify-center items-center animate-pulse'
                                                    onClick={() => {
                                                        handleMarkerClick(marker, marker.lat, marker.long)
                                                    }}
                                                >
                                                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                :
                                                <div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/90 hover:from-blue-500/70 hover:to-sky-500/70 to-blue-500/90 border-2 border-blue-200/90 hover:border-sky-200/70 justify-center items-center'
                                                    onClick={() => {
                                                        handleMarkerClick(marker, marker.lat, marker.long)
                                                    }}
                                                >
                                                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                                                        {index + 1}
                                                    </div>
                                                </div>
                                }
                            </Marker>

                            {
                                isSelectedCP.long === marker.long && (
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
                                                <div className='bg-yellow-400 px-2 rounded-sm sfont-medium'>
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

            <div id='filter-menu' className='flex w-full justify-center items-center absolute top-2 z-2' >
                <div
                    className='flex flex-col w-full mx-2 items-start justify-center'
                >
                    <div className='flex flex-col w-4/5 md:w-2/5 lg:w-1/4 bg-slate-200/90 border-2 border-slate-100/90 rounded-md'>

                        <div className='flex flex-row w-full rounded-md items-center justify-center'>
                            <div className='flex justify-center items-center'>
                                <p className='text-slate-600 p-[0.2] px-2  rounded-full font-bold'>Center:</p>
                            </div>
                            <div className='flex w-full justify-between items-center'>
                                <div className='flex w-1/2 justify-center'>
                                    <p className='text-start text-slate-700'>Lat: <b>{viewState.latitude.toFixed(4)}</b></p>
                                </div>
                                <div className='flex w-1/2 justify-center'>
                                    <p className='text-start text-slate-700'>Long: <b>{viewState.longitude.toFixed(4)}</b></p>
                                </div>
                            </div>
                        </div>
                        <div className='border-b border-slate-300 flex w-full' />

                        <div className='flex flex-row w-full rounded-md items-center justify-center'>
                            <div className='flex justify-center items-center p-1'>
                                <p className='text-white p-[0.2] px-2 bg-lime-600/90 rounded-full font-bold'>Current:</p>
                            </div>
                            <div className='flex w-full justify-between items-center'>
                                <div className='flex w-1/2 justify-center'>
                                    <p className='text-start'>Lat: <b>{currentPosition.latitude.toFixed(4)}</b></p>
                                </div>
                                <div className='flex w-1/2 justify-center'>
                                    <p className='text-start'>Long: <b>{currentPosition.longitude.toFixed(4)}</b></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div id='HUD' className='flex flex-col space-y-2 w-full justify-around items-center absolute bottom-20' >
                <div id='checkpoints-array' className='flex flex-wrap w-full md:w-2/3 lg:w-1/2 justify-center space-x-4 items-center'>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/90 border-2 border-lime-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                            <CheckCircleIcon style={{ color: '#4A5f50' }} />
                        </div>
                    </div>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-sky-500/90 border-2 border-blue-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                            <CheckCircleIcon style={{ color: '#1f34f4' }} />
                        </div>
                    </div>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-sky-500/90 border-2 border-blue-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                            <CheckCircleIcon style={{ color: '#1f34f4' }} />
                        </div>
                    </div>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/90 border-2 border-lime-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-lg font-bold'>
                            {4}
                        </div>
                    </div>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/90 border-2 border-lime-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-lg font-bold'>
                            {5}
                        </div>
                    </div>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/90 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/90 border-2 border-lime-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-lg font-bold'>
                            {6}
                        </div>
                    </div>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/90 hover:from-yellow-500/70 hover:to-yellow-500/70 to-orange-500/90 border-2 border-yellow-200/90 hover:border-lime-200/70 justify-center items-center'
                    >
                        <div className='flex w-full justify-center h-full items-center text-lg font-bold'>
                            {7}
                        </div>
                    </div>

                </div>
            </div>

            <NavigationControl />
            <GeolocateControl />
            <ScaleControl />
        </Map >
    )
}