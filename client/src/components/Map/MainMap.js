import React, { useState } from 'react'
import Map, { Source, Layer, Marker } from 'react-map-gl';

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
                anchor="bottom"
                offset={0}
                scale={2}
            >
                <div latitude={0} longitude={0} className='font-black text-4xl'>You are here!</div>
            </Marker>
            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>
        </Map>
    )
}
