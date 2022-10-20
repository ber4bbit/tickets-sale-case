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

let from_A_to_B_arr = [];
let from_B_to_A_arr = [];

// Array.from(ticketTime.children).forEach(elem => {
//     if (elem.value.replace(/[:()\d]/g, '') === 'из A в B') from_A_to_B_arr.push(elem)
//     else if (elem.value.replace(/[:()\d]/g, '') === 'из B в A') from_B_to_A_arr.push(elem);
// })

const selectRouteHandle = routeSelect => {
    filterTime(ticketTime)

    routeSelect.value != defaultRoute
        ? ticketTime.classList.remove('time-select_hidden')
        : ticketTime.classList.add('time-select_hidden');

    routeSelect.value === 'из A в B и обратно в А'
        ? ticketTimeBack.classList.remove('time-select_hidden')
        : ticketTimeBack.classList.add('time-select_hidden');

    
}

const filterTime = timeSelect => {
    // if (ticketRoute.value === 'из A в B') {
    //     while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
    //     timeSelect.append(...from_A_to_B_arr);
    //     timeSelect.append(...from_A_to_B_arr);
    // } else if (ticketRoute.value === 'из B в A') {
    //     while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
    //     timeSelect.replaceChildren(...from_B_to_A_arr);
    // } else if (ticketRoute.value === 'из A в B и обратно в А') {
    //     while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
    //     timeSelect.replaceChildren(...from_B_to_A_arr);
    //     timeSelect.append(...from_B_to_A_arr);
    // }

    while (document.querySelector('.tickets-wrapper').children[1]) document.querySelector('.tickets-wrapper').removeChild(document.querySelector('.tickets-wrapper').children[1])

    if (ticketRoute.value === 'из A в B') {
        let timeList = document.createElement('select');
        timeList.className = 'form-select time-select';

        fromAtoB.forEach(elem => {
            let timeOption = document.createElement('option');
            timeOption.innerText = elem.time;
            timeList.appendChild(timeOption);
        })

        document.querySelector('.tickets-wrapper').appendChild(timeList);
        

    } 
    // else if (ticketRoute.value === 'из B в A') {
    //     timeSelect.append(...fromBtoA);
    // } else timeSelect.append(...fromBtoA);
      
}

const renderBackTime = timeSelect => {
    let timeBackOptionsArr = [];
    let elemClone;

    while (ticketTimeBack.children[1]) {
        ticketTimeBack.removeChild(ticketTimeBack.children[1])
    }

    from_B_to_A_arr.forEach(elem => {
        elem.value.replace(/[^:\d]/g, '') > timeSelect.value
            ? (
                elemClone = elem.cloneNode(true),
                timeBackOptionsArr.push(elemClone)
            )
            : null
        
        
    })
    ticketTimeBack.append(...timeBackOptionsArr);
}



const selectTimeHandle = timeSelect => {
    // filterTime(ticketTime)
}