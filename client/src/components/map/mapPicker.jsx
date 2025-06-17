import { useState } from 'react'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { Circle } from './circle';
import { Slider } from '@heroui/react';

function MapPicker({
    defaultLat = +import.meta.env.VITE_MAPS_DEFAULT_LAT,
    defaultLng = +import.meta.env.VITE_MAPS_DEFAULT_LNG,
    defaultRadius = 300,
} = props) {
    const [position, setPosition] = useState({ lat: defaultLat, lng: defaultLng })
    const [radius, setRadius] = useState(defaultRadius)

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                onClick={(e) => { console.log(e); /*setPosition(e.detail.latLng) */ }}
                className='w-full h-96'
                defaultCenter={position}
                defaultZoom={15}
                mapId="LOCATION_¨PICKER"
                streetViewControl={false}
                fullscreenControl={false}
                mapTypeControl={false}
            >
                <Circle
                    className='pointer-events-none'
                    center={position}
                    radius={radius}
                    strokeColor={'#0c4cb3'}
                    strokeOpacity={.5}
                    strokeWeight={2}
                    fillColor={'#3b82f6'}
                    fillOpacity={0.2}
                />
                <AdvancedMarker
                    draggable
                    position={position}
                    onDragEnd={(e) => setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                />
            </Map>
            <Slider
                className='px-4'
                label="Radio de Registro"
                formatOptions={{ style: 'unit', unit: 'meter' }}
                value={radius} onChange={setRadius}
                maxValue={1500}
                minValue={100}
                step={100}
                showSteps
                showTooltip
                marks={[
                    {
                        value: 100,
                        label: "100 m",
                    },
                    {
                        value: 500,
                        label: "500 m",
                    },
                    {
                        value: 1000,
                        label: "1 Km",
                    },
                    {
                        value: 1500,
                        label: "1.5 Km",
                    },
                ]}
            />
            <div className='hidden'>
                <input readOnly name='lat' value={position.lat} />
                <input readOnly name='lng' value={position.lng} />
                <input readOnly name='rad' value={radius} />
            </div>
        </APIProvider >
    );
}

export default MapPicker;