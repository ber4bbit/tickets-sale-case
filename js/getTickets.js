let fromAtoB = [];
let fromBtoA = [];

const getData = async () => {
    let response = await fetch("../tickets.json");
    let result = await response.json();

    fromAtoB.push(...result[0])
    fromBtoA.push(...result[1]);

    // result[0].forEach(elem => {
    //     let option = document.createElement('option');
    //     option.innerText = elem.time;
    //     fromAtoB.push(option);
    // })
}

getData();
