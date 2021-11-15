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

//-------------------------------------------------------------//

module.exports = {
    getProject
};