const fetchP =
    import ('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))

//-------------------------------------------------------------//

async function getProject() {
    try {
        const url = process.env.API_KEY;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function getHistory(name, period) {
    try {
        const url = process.env.HistoryAPI_KEY;
        const response = await fetch('https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?', {
            method: 'GET',
            headers: {
                'api-key': 'bc85d01f782a63da5d532fba74f410ec794d061f55cf29d9b2b6c3db1cf3',
                'project': name,
                'period': period
            }
        });
        if (response.status !== 200) {
            throw new Error(`There was an error with status code ${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

//-------------------------------------------------------------//

module.exports = {
    getProject,
    getHistory
};