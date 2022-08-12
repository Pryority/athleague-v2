// import React, { useEffect, useState } from 'react'
// import InteractiveMap, { Source, Layer, Marker, Popup } from 'react-map-gl';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// // import { Button } from '@mui/material';
// import axios from 'axios';
// const TOKEN = process.env.REACT_APP_MAPBOX;
// // const geojson = {
// //     type: 'FeatureCollection',
// //     features: [
// //         { type: 'Feature', geometry: { type: 'Point', coordinates: [-81, 40] } }
// //     ]
// // };

// // const layerStyle = {
// //     id: 'point',
// //     type: 'circle',
// //     paint: {
// //         'circle-radius': 10,
// //         'circle-color': '#007cbf'
// //     }
// // };

// export default function CourseMap() {
//     const [viewState, setViewState] = useState({
//         latitude: 40,
//         longitude: -81,
//         zoom: 15
//     });
//     const [markers, setMarkers] = useState([]);
//     const handleClick = ({ lngLat: [longitude, latitude] }) => {
//         console.log(longitude, latitude);
//         var long;
//         if (longitude < 0) long = -1 * (Math.abs(longitude) % 180);
//         else long = Math.abs(longitude) % 180;
//         console.log("long", long);
//         setMarkers(markers => [...markers, { longitude, latitude }]);
//     };

//     return (
//         <InteractiveMap
//             {...viewState}
//             onMove={evt => setViewState(evt.viewState)}
//             onClick={handleClick}
//             mapboxAccessToken={TOKEN}
//             // mapStyle="mapbox://styles/matthewpryor/ckzepsxne002b14ov4oo7gb8r"
//             mapStyle="mapbox://styles/mapbox/streets-v9"
//             className='relative'
//         >
//             <div className='flex w-full mx-8 justify-center items-start absolute top-12'>
//                 <div className='flex w-full justify-center items-start absolute'>
//                     <div className='flex w-1/5'>
//                         <div className='h-10 w-10 bg-red-500 rounded-full border shadow' />
//                     </div>
//                     <div className='flex flex-col w-3/5 items-center space-y-2'>
//                         <input placeholder='Search by location' className='flex w-full z-50 rounded-lg p-2 border shadow' />
//                         <div className='flex w-full justify-center space-x-4'>
//                             <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
//                                 Adventure
//                             </div>
//                             <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
//                                 Tactical
//                             </div>
//                             <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
//                                 Sprint
//                             </div>
//                             <div className='bg-sky-100 px-4 rounded-full border-2 border-slate-400 shadow-sm'>
//                                 Objective
//                             </div>
//                         </div>
//                     </div>
//                     <div className='flex w-1/5'>
//                         <div className='h-12 w-12 bg-clear rounded-full' />
//                     </div>
//                 </div>
//             </div>
//             {markers.map((m, i) => (
//                 <Marker {...m} key={i}>
//                     click
//                 </Marker>
//             ))}
//         </InteractiveMap >
//     )
// }
