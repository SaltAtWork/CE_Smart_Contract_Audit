// API testing

const { response } = require('express');

const fetchP =
    import ('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))

async function getData() {
    try {
        const response = await fetch('https://data-api.defipulse.com/api/v1/defipulse/api/GetProjects?api-key=bc85d01f782a63da5d532fba74f410ec794d061f55cf29d9b2b6c3db1cf3');
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

getData().then(data => {
    console.log(data[0].value.tvl.USD.value);
})
async function getHistory(name, period) {
    try {
        const url = process.env.HistoryAPI_KEY;
        const response = await fetch('https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'bc85d01f782a63da5d532fba74f410ec794d061f55cf29d9b2b6c3db1cf3',
                'project': name,
                'period': period
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

getHistory('aave', '3m').then(data => {
    console.log(data[0].timestamp);
})

/*
getData().then(data => {
    console.log(data[0].value.tvl.USD.value);
})
*/
