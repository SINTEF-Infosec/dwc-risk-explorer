const EVENTS_FILE = "events.json"
const MEASURES_FILE = "measures.json"

export async function getJSON(fileName) {
    return fetch('/resources/' + fileName,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            return response.json();
        })
}

export async function GetAllEvents() {
    return getJSON(EVENTS_FILE);
}

export const GetAllMeasures = () => getJSON(MEASURES_FILE);
