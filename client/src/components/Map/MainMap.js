import Map from 'react-map-gl';

import React, { useState } from 'react'

export default function MainMap() {
    const [viewState, setViewState] = useState({
        longitude: -81,
        latitude: 40,
        zoom: 8
    });

    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    )
}
