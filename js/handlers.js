// Обработчик, который скрывает select с выбором времени, пока не выбран маршрут и также скрывающий select для выбора времени обратного маршрута, если не выбран соответствующий маршрут
const ticketTimeSelectHandle = routeSelect => {
    routeSelect.value != defaultRoute
        ? ticketTime.classList.remove('visually-hidden')
        : ticketTime.classList.add('visually-hidden');

    routeSelect.value === 'из A в B и обратно в А'
        ? ticketBackTime.classList.remove('visually-hidden')
        : ticketBackTime.classList.add('visually-hidden');

    addOptions(ticketTime)
}

// Обработчик, необходимый чтобы правильно отображать время прибытия при маршруте из А в В и обратно в А
const ticketBackTimeSelectHandle = ticketBackTimeSelect => {
    ticketBackTimeValueMomentObj = new moment()
        .date(ticketBackTimeSelect.value.replace(/[:' 'A-Za-z]/g, '') % 100)
        .hour(Math.trunc(ticketBackTimeSelect.value.replace(/[:' 'A-Za-z]/g, '') / 10000))
        .minute((Math.trunc(ticketBackTimeSelect.value.replace(/[:' 'A-Za-z]/g, '') / 100) % 100) + 50);
    ticket.arrival = ticketBackTimeValueMomentObj.format('HH:mm');
}

// Обработчик, который скрывает кнопку, если все поля не заполнены и наоборот
const calculateBtnHandle = () => {
    if (ticketRoute.value != defaultRoute && ticketRoute.value != 'из A в B и обратно в А') {
        if (ticketTime.value != defaultTime && ticketCount.value != '') calculateBtn.removeAttribute('disabled')
        else calculateBtn.setAttribute('disabled', true);
    } else if (ticketRoute.value === 'из A в B и обратно в А') {
        if (ticketTime.value != defaultTime && ticketCount.value != '') calculateBtn.removeAttribute('disabled')
        else calculateBtn.setAttribute('disabled', true);
    }
}