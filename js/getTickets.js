let fromAtoB = [];
let fromBtoA = [];

const changeTimeZone = (timeArr) => {
    // Определение часового пояса пользователя в формате Region/City
    const userTimeZone = moment.tz.guess();
    // Установка часового пояса по умолчанию (по тз часовой пояс по умолчанию - Москва)
    moment.tz.setDefault('Europe/Moscow');

    // Перебор элементов полученных из json файла и создание html элементов с занесением внутрь них информации в правильном формате
    timeArr.forEach(elem => {
        let option = document.createElement('option');
        option.innerText = moment()
            .hour(Math.trunc((elem.time.replace(/:/g, '') / 100)))
            .minute(elem.time.replace(/:/g, '') % 100)
            .tz(userTimeZone)
            .format('HH:mm MMMM D');

        // Чтобы в дальнейшем упросить рендеринг времен для каждого route`а сразу раскидываю времна на 2 массива в зависимости от route`а (по тз в route из А в В первое время 18:00)
        // В случае изменения, например, все будет идти подряд, можно по условие disable`ить option`ы, которые не относятся к тому или иному route`у
        timeArr[0].time === '18:00'
            ? fromAtoB.push(option)
            : fromBtoA.push(option)
    })
}

const getData = async () => {
    let response = await fetch("../tickets.json");
    let result = await response.json();

    changeTimeZone(result[0]);
    changeTimeZone(result[1]);
}

getData();
