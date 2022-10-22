const ticketRoute = document.getElementById('ticket-route');
const ticketTime = document.getElementById('ticket-time');
const ticketBackTime = document.getElementById('ticket-back-time');
const defaultRoute = 'Выберите пункт назначения';
const defaultTime = 'Выберите время';
const singleRoutePrice = 700;
const doubleRoutePrice = 1200;
const singleRouteDuration = 50;

// Обработчик, который скрывает select с выбором времени, пока не выбран маршрут и также скрывающий select для выбора времени обратного маршрута, если не выбран соответствующий маршрут
const ticketTimeSelectHandle = routeSelect => {
    routeSelect.value != defaultRoute
        ? ticketTime.classList.remove('time-select_hidden')
        : ticketTime.classList.add('time-select_hidden');

    routeSelect.value === 'из A в B и обратно в А'
        ? ticketBackTime.classList.remove('time-select_hidden')
        : ticketBackTime.classList.add('time-select_hidden');

    addOptions(ticketTime)
}

// Обработчик, который добавляет билеты (времена) в зависимости от маршрута
const addOptions = timeSelect => {
    if (ticketRoute.value === 'из A в B') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1]) // Удаление всех option`ов из select, кроме дефолтного
        timeSelect.append(...fromAtoB);
    } else if (ticketRoute.value === 'из B в A') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromBtoA);
    } else if (ticketRoute.value === 'из A в B и обратно в А') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromAtoB);
    }
}

const renderBackTime = timeSelect => {
    while (ticketBackTime.children[1]) ticketBackTime.removeChild(ticketBackTime.children[1])

    let timeBackOptionsArr = [];
    let elemClone;

    // Создание объекта moment из value селекта для дальнейшего сравнения каждого элемента массива с временами с ним
    let timeSelectValueMomentObj = new moment()
            .date(timeSelect.value.replace(/[:' 'A-Za-z]/g, '') % 100)
            .hour(Math.trunc(timeSelect.value.replace(/[:' 'A-Za-z]/g, '') / 10000))
            // Прибавляем время singleRouteDuration в пути, чтобы правильно отфильтровать время, которое доступно для отправления обратно, потому что нельзя ведь отправиться в 22:30
            // из A в B, а затем в 22:45 отправиться обратно из B в A
            .minute((Math.trunc(timeSelect.value.replace(/[:' 'A-Za-z]/g, '') / 100) % 100) + singleRouteDuration);

    fromBtoA.forEach(elem => {

        // Создание объекта moment из каждого элемента массива с временами
        let elemMomentObj = new moment()
            .date(elem.value.replace(/[:' 'A-Za-z]/g, '') % 100)
            .hour(Math.trunc(elem.value.replace(/[:' 'A-Za-z]/g, '') / 10000))
            .minute(Math.trunc(elem.value.replace(/[:' 'A-Za-z]/g, '') / 100) % 100); 

        // Метод isAfter проверяет идет ли дата (объект), на котором вызван метод после даты, которая передается в качестве параметра isAfter
        if (elemMomentObj.isAfter(timeSelectValueMomentObj)) elemClone = elem.cloneNode(true); timeBackOptionsArr.push(elemClone);
    })
    ticketBackTime.append(...timeBackOptionsArr);
}
