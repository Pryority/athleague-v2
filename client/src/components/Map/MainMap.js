import React, { useState } from 'react'
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from '@mui/material';

const geojson = {
    type: 'FeatureCollection',
    features: [
        { type: 'Feature', geometry: { type: 'Point', coordinates: [-81, 40] } }
    ]
};

const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    }
};

export default function MainMap() {
    const [viewState, setViewState] = useState({
        latitude: 40,
        longitude: -81,
        zoom: 15
    });

    const [showPopup, setShowPopup] = useState(true);
    // const handleMarkerClick = () => {
    //     setShowPopup(!showPopup)
    // }
    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            // mapStyle="mapbox://styles/matthewpryor/ckzepsxne002b14ov4oo7gb8r"
            mapStyle="mapbox://styles/mapbox/streets-v9"

        >
            <Marker
                latitude={40}
                longitude={-81}
                anchor="right"
                offset={0}
                scale={2}
            >
                {/* <div latitude={0} longitude={0} className='font-black text-4xl'>You are here!</div> */}
            </Marker>
            {showPopup && (
                <Popup longitude={-81} latitude={40}
                    anchor="left"
                    onClose={() => setShowPopup(false)}
                    focusAfterOpen={true}
                >
                    <div className='w-full'>
                        <img src='https://www.seguin.ca/en/explore-play/resources/Pictures/11140305_bn_seguin-interiors_0052_bike-on-trail.jpg' alt='trail-demo' className='rounded-md mb-2' />
                        <h4 className='text-xl font-bold'>Brick Works Blitz</h4>
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
                        <div className='flex w-full justify-center mt-4'>
                            <button className='flex w-full items-center justify-center bg-blue-500 border hover:border-slate-300 text-white p-1 px-2 rounded-md'
                                onClick={() => console.log('viewing course!')}
                            >
                                View Course
                            </button>
                            <div className='flex items-center px-2'>
                                <BookmarkIcon color="primary" />
                            </div>
                        </div>

                    </div>
                </Popup>)
            }
            {/* <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source> */}
        </Map >
    )
}
