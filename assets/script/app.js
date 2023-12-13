'use strict';

const track = document.querySelector('.track');
const mapSection = document.querySelector('.location');
const mapDiv = document.getElementById('map');

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhb3MxNiIsImEiOiJjbHEzd3pydmswMTBvMnJxbHVndmk2c2c4In0.cIfdBIcw-tte467qbZETYQ';

function getLocation(position) {
    const { latitude, longitude } = position.coords;
    mapDiv.style.display = 'block'; // Display the map container

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15
    });

    map.addControl(new mapboxgl.AttributionControl(), 'bottom-right');
    const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    
    mapSection.style.display = 'block';
    document.querySelector('.location p').style.display = 'none';
}

function errorHandler(error) {
    console.log(error.message);
}

const options = {
    enableHighAccuracy: true
};

track.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(getLocation, errorHandler);
    } else {
        mapSection.innerText = 'Sorry. You blocked the track button so your location could not be found';
    }
});