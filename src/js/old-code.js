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