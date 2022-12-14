import React, { useEffect, useRef, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { NavigationControl } from 'react-map-gl';
import { GeolocateControl } from 'react-map-gl';
import { ScaleControl } from 'react-map-gl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const TOKEN = process.env.REACT_APP_MAPBOX;
const cps = [{
    "lat": 49.27955108537651,
    "long": -122.92795084401877
},
{
    "lat": 49.26953110037749,
    "long": -122.91434820001696
}]

export default function CreateMap() {
    const [viewState, setViewState] = useState({
        latitude: 49.29837092831224,
        longitude: -122.93407397752691,
        zoom: 10.647035651394196
    });

    const [checkpoints, setCheckpoints] = useState([]);
    const [isSelectedCP, setIsSelectedCP] = useState(null);
    const [courseName, setCourseName] = useState('');
    const [showSave, setShowSave] = useState(false);
    const [showQuit, setShowQuit] = useState(false);
    const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

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
    // console.log('ID: ', id)

    console.log(cps)

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

            <div id='upper-HUD' className='flex w-full px-2 space-x-2 justify-start items-center absolute top-2 z-2' >
                <div>
                    <Link to='/' className='flex w-10 h-10 bg-slate-700 rounded-full items-center justify-center opacity-90 border-2 border-slate-100/30'
                        onClick={() => setShowQuit(true)}
                    >
                        <KeyboardReturnIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div
                    className='flex flex-col w-full mx-2 items-start justify-center  animate-fade-in-down'
                >
                    <div className='flex flex-col space-y-2 w-4/6 md:w-2/5 lg:w-1/3 items-center justify-center bg-slate-200/90 rounded-xl border-2 border-slate-800/30 shadow'>
                        <div className='flex flex-row w-full rounded-md items-center justify-center p-1'>
                            {(currentPosition.latitude !== 0) ? (
                                <div className='flex w-1/4 justify-center items-center '>
                                    <p className='text-white p-[0.2] px-2 bg-green-600/90 rounded-full font-bold'>Live</p>
                                </div>
                            )
                                :
                                (<div className='flex justify-center items-center p-1'>
                                    <p className='text-white p-[0.2] px-2 bg-red-600/90 rounded-full font-bold'>Loading...</p>
                                </div>)
                            }

                            <div className='flex w-full justify-between items-center'>
                                <div className='flex w-1/2 justify-center'>
                                    <p className='text-start text-[10px]'>Lat: <b>{currentPosition.latitude.toFixed(4)}</b></p>
                                </div>
                                <div className='flex w-1/2 justify-center'>
                                    <p className='text-start text-[10px]'>Long: <b>{currentPosition.longitude.toFixed(4)}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='lower-HUD' className='flex flex-col space-y-2 w-full justify-around items-center absolute bottom-20 animate-slow-fade-in-up' >
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