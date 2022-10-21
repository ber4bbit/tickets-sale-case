const ticketTime = document.getElementById('time');
const ticketTimeBack = document.getElementById('back-time');
const ticketRoute = document.getElementById('route');
const defaultRoute = 'Выберите пункт назначения';
const defaultTime = 'Выберите время';
const singleRoutePrice = 700;
const doubleRoutePrice = 1200;
const singleRouteDuration = 50;

const selectRouteHandle = routeSelect => {
    addOptions(ticketTime)

    routeSelect.value != defaultRoute
        ? ticketTime.classList.remove('time-select_hidden')
        : ticketTime.classList.add('time-select_hidden');

    routeSelect.value === 'из A в B и обратно в А'
        ? ticketTimeBack.classList.remove('time-select_hidden')
        : ticketTimeBack.classList.add('time-select_hidden');
}

const addOptions = timeSelect => {
    if (ticketRoute.value === 'из A в B') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromAtoB);
    } else if (ticketRoute.value === 'из B в A') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromBtoA);
    } else if (ticketRoute.value === 'из A в B и обратно в А') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromBtoA);
    }
}

const renderBackTime = timeSelect => {
    let timeBackOptionsArr = [];
    let elemClone;

    while (ticketTimeBack.children[1]) ticketTimeBack.removeChild(ticketTimeBack.children[1])

    //TODO: Надо сделать сравнение с учетом смены часового пояса

    fromBtoA.forEach(elem => {
        elem.value > timeSelect.value
            ? (
                elemClone = elem.cloneNode(true),
                timeBackOptionsArr.push(elemClone)
            )
            : null
    })

    ticketTimeBack.append(...timeBackOptionsArr);
}

const selectTimeHandle = () => {
    // filterTime(ticketTime)
}