let fromAtoB = [];
let fromBtoA = [];

const defaultTimeZone = 3;
const userTimeZone = new Date().getTimezoneOffset() / 60 * -1;
const differenceTimeZone = () => {
    return userTimeZone > defaultTimeZone
        ? userTimeZone - defaultTimeZone
        : defaultTimeZone - userTimeZone
}

const changeTimeZone = (timeArr) => {
    timeArr.forEach(elem => {
        let hours = Math.trunc((elem.time.replace(/:/g, '') / 100) + differenceTimeZone());
        let minutes = elem.time.replace(/:/g, '') % 100;

        if (hours > 24) hours = `0${hours - 24}`
        else if (hours === 24) hours = `00`

        if (minutes === 0) minutes = '00'

        let userTime = `${hours}:${minutes}`;

        let option = document.createElement('option');
        option.innerText = userTime;
        
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
