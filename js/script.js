const ticketTime = document.getElementById('time');
const ticketTimeBack = document.getElementById('back-time');
const ticketRoute = document.getElementById('route');
const defaultRoute = 'Выберите пункт назначения';
const defaultTime = 'Выберите время';
const singleRoutePrice = 700;
const doubleRoutePrice = 1200;
const singleRouteDuration = 50;
const date = new Date();
const localTime = `${date.getHours()}` + `:` + `${date.getMinutes()}`;


const timeBackOption = document.createElement('option');

console.log((date.getTimezoneOffset() / 60) * -1);

const selectRouteHandle = routeSelect => {
    routeSelect.value != defaultRoute
        ? ticketTime.classList.remove('time-select_hidden')
        : ticketTime.classList.add('time-select_hidden');

    routeSelect.value === 'из A в B и обратно в А'
        ? ticketTimeBack.classList.remove('time-select_hidden')
        : ticketTimeBack.classList.add('time-select_hidden');

    filterTime(ticketTime)
}

const filterTime = timeSelect => {
    if (ticketRoute.value === 'из A в B') {
        Array.from(timeSelect).forEach(elem => {
            elem.value.replace(/[:()\d]/g, '') === 'из B в A' || elem.value === defaultTime
                ? elem.setAttribute('disabled', true)
                : elem.removeAttribute('disabled')
        })
    } else if (ticketRoute.value === 'из B в A') {
        Array.from(timeSelect).forEach(elem => {
            elem.value.replace(/[:()\d]/g, '') === 'из A в B' || elem.value === defaultTime
                ? elem.setAttribute('disabled', true)
                : elem.removeAttribute('disabled')
        })
    } else if (ticketRoute.value === 'из A в B и обратно в А') {
        Array.from(timeSelect).forEach(elem => {
            elem.value.replace(/[:()\d]/g, '') === 'из B в A' || elem.value === defaultTime
                ? (elem.setAttribute('disabled', true), console.log(elem.textContent))
                : elem.removeAttribute('disabled')
        })

        
    }
    
}