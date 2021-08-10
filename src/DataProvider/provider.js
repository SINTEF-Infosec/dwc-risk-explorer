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

export async function GetAllMeasures() {
    return getJSON(MEASURES_FILE);
}

export async function GetEvent(id) {
    return getJSON(EVENTS_FILE).then((events) => {
        let evt = null
        events.forEach((event) => {
            if (event["id"] === id) {
                evt = event
            }
        })
        return evt
    })
}

export async function GetMeasure(id) {
    return getJSON(MEASURES_FILE).then((measures) => {
        let m = null
        measures.forEach((measure) => {
            if (measure["id"] === id) {
                m = measure
            }
        })
        return m
    })
}

export async function GetEventMeasures(ids) {
    return getJSON(MEASURES_FILE).then((measures) => {
        let evt_measures = []
        measures.forEach((measure) => {
            if (ids.includes(measure["id"].slice(1).replace(/^0+/, ''))) {
                evt_measures.push(measure)
            }
        })
        return evt_measures
    })
}