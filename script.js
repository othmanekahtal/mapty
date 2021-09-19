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
// let map, mapEvent;
// // ⬇ accept two parameters :
// navigator.geolocation.getCurrentPosition(function (position) {
//         const {latitude, longitude} = position.coords;
//         console.log(latitude, longitude)
//         const coods = [latitude, longitude]
//         map = L.map('map').setView(coods, 13);
//
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);
//
//         L.marker(coods).addTo(map)
//             .bindPopup('your current location.')
//             .openPopup();
//         // map.on like an event listener but for map :
//         map.on('click', function (mapE) {
//             mapEvent = mapE;
//             form.classList.remove('hidden');
//             inputDistance.focus();
//         })
//     },
//     function () {
//         window.alert('Error We can\'t get your current location !')
//     });
//
// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     console.log(mapEvent)
//     const {lat, lng} = mapEvent.latlng;
//     L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup(
//             L.popup(
//                 {
//                     closeOnClick: false,
//                     autoClose: false,
//                     className: 'running-popup'
//                 }
//             )
//         ).setPopupContent('WORKOUT')
//         .openPopup();
//     e.target.reset();
// })
// inputType.addEventListener('change', function () {
//     inputElevation.closest(".form__row").classList.toggle('form__row--hidden');
//     inputCadence.closest(".form__row").classList.toggle('form__row--hidden');
// })


class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));
    }

    _getPosition() {
        // in callback function only pass a function name without a () and params,automatically js do that's
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
            function () {
                window.alert('Error We can\'t get your current location !')
            });
    }

    _loadMap(position) {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude)
        const coods = [latitude, longitude]
        // this is undefined : use bind in getCurrentLocation to set this keyword !!!!!!!!!
        console.log(this)
        this.#map = L.map('map').setView(coods, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        L.marker(coods).addTo(this.#map)
            .bindPopup('your current location.')
            .openPopup();
        // map.on like an event listener but for map :
        this.#map.on('click', (mapE) => {
            this.#mapEvent = mapE;
            this._showForm();
        })
    }

    _showForm() {
        form.classList.remove('hidden');
        inputDistance.focus()
    }

    _toggleElevationField() {
        inputElevation.closest(".form__row").classList.toggle('form__row--hidden');
        inputCadence.closest(".form__row").classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
            e.preventDefault();
        inputDistance.focus();
        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup(
                    {
                        closeOnClick: false,
                        autoClose: false,
                        className: 'running-popup'
                    }
                )
            ).setPopupContent('WORKOUT')
            .openPopup();
    }
}

const app = new App();