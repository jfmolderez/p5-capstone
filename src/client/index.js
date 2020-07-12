import './styles/main.scss';
import './styles/trips.scss';
import './styles/utils.scss';
import './js/main';

// navigator.serviceWorker.getRegistrations().then(function(registrations) {
//     for(let registration of registrations) {
//      registration.unregister()
//    } })

// if ( 'serviceWorker' in navigator ) {

//     window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
//}