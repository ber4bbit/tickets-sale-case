let fromAtoB = [];
let fromBtoA = [];

const changeTimeZone = (timeArr) => {
    const userTz = moment.tz.guess();
    moment.tz.setDefault('Europe/Moscow');

    timeArr.forEach(elem => {
        let option = document.createElement('option');
        option.innerText = moment()
            .hour(Math.trunc((elem.time.replace(/:/g, '') / 100)))
            .minute(elem.time.replace(/:/g, '') % 100)
            .tz(userTz)
            .format('HH:mm MMMM D');

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
