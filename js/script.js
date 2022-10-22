const ticket = {
    route: '',
    price: '',
    duration: '',
    departure: '',
    arrival: ''
}

// Обработчик, который добавляет билеты (времена) в зависимости от маршрута
const addOptions = timeSelect => {
    if (ticketRoute.value === 'из A в B') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1]) // Удаление всех option`ов из select, кроме дефолтного
        timeSelect.append(...fromAtoB);
        ticket.route = 'из A в B';
        ticket.price = singleRoutePrice;
        ticket.duration = singleRouteDuration;
    } else if (ticketRoute.value === 'из B в A') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromBtoA);
        ticket.route = 'из B в A';
        ticket.price = singleRoutePrice;
        ticket.duration = singleRouteDuration;
    } else if (ticketRoute.value === 'из A в B и обратно в А') {
        while (timeSelect.children[1]) timeSelect.removeChild(timeSelect.children[1])
        timeSelect.append(...fromAtoB);
        ticket.route = 'из A в B и обратно в А';
        ticket.price = doubleRoutePrice;
        ticket.duration = doubleRouteDuration;
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
            // Прибавляем время пути в одну сторону, чтобы правильно отфильтровать время, которое доступно для отправления обратно, потому что нельзя ведь отправиться в 22:30
            // из A в B, а затем в 22:45 отправиться обратно из B в A
            .minute((Math.trunc(timeSelect.value.replace(/[:' 'A-Za-z]/g, '') / 100) % 100) + 50);

    fromBtoA.forEach(elem => {
        // Создание объекта moment из каждого элемента массива с временами
        let elemMomentObj = new moment()
            .date(elem.value.replace(/[:' 'A-Za-z]/g, '') % 100)
            .hour(Math.trunc(elem.value.replace(/[:' 'A-Za-z]/g, '') / 10000))
            .minute(Math.trunc(elem.value.replace(/[:' 'A-Za-z]/g, '') / 100) % 100); 
        // Метод isAfter проверяет идет ли дата (объект), на котором вызван метод после даты, которая передается в качестве параметра isAfter
        if (elemMomentObj.isAfter(timeSelectValueMomentObj)) elemClone = elem.cloneNode(true); timeBackOptionsArr.push(elemClone);
    })
    ticket.departure = timeSelect.value.slice(0, 5);
    ticket.arrival = timeSelectValueMomentObj.format('HH:mm');
    ticketBackTime.append(...timeBackOptionsArr);
}

// Обработчик кнопки, которые считает и выводит всю информацию о билете
calculateBtn.addEventListener('click', () => {
    // Проверка на существование элемента с информацией о билете, чтобы не было такого, что они будут добавляться друг за другом
    if (document.querySelector('.ticket-info')) document.querySelector('.ticket-info').remove()

    let ticketElement = document.createElement('span');
    ticketElement.className = 'ticket-info'
    ticketElement.innerText = `Вы выбрали ${ticketCount.value} билет(ов) по маршруту ${ticket.route} стоимостью ${ticket.price * ticketCount.value}р.
        Это путешествие займет у вас ${ticket.duration}.
        Теплоход отправляется в ${ticket.departure}, а прибудет в ${ticket.arrival}.`

    document.querySelector('.tickets-wrapper').append(ticketElement);
})