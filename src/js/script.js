'use strict';
import uniqid from 'uniqid';
import L from 'leaflet';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

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
        const coods = [latitude, longitude]
        // this is undefined : use bind in getCurrentLocation to set this keyword !!!!!!!!!
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
        e.target.reset();
        inputDistance.blur();
    }
}

class Workout {
    _date = new Date();
    _id = uniqid(`workout-${Date.now()}-`);
    _workout;
    _distance;
    _duration;
    _coords;

    constructor(coords, distance, duration) {
        this._distance = distance;
        this._coords = coords;
        this._duration = duration;
    }
}

class Running extends Workout {
    #cadence;
    #pace;
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.#cadence = cadence;
        this.calcPace();
    }
    calcPace(){
        this.#pace = this._distance / this._duration;
        return this.#pace;
    }
}

class Cycling extends Workout {
    #elevationGain;
     #speed;
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.#elevationGain = elevationGain;

    }
    calcSpeed(){
        this.#speed = this._distance / ~(this._duration/60);
        return this.#speed;
    }

}

const app = new App();
let WorkoutType = inputType.value="running" ? 'running':"cycling";
const Run1 = new Running([13,-23],12,10,5);
const Cycl1 = new Running([-13,3],15,20,15);
console.log(Run1,Cycl1);
