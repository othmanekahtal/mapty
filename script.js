'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


// geolocation api :

// ⬇ accept two parameters :
navigator.geolocation.getCurrentPosition(function (position) {
        alert('success get your current location!');
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude)
        const coods = [latitude, longitude]
        const map = L.map('map').setView(coods, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coods).addTo(map)
            .bindPopup('your current location.')
            .openPopup();
    },
    function () {
        window.alert('Error We can\'t get your current location !')
    });