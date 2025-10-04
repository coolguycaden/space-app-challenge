const SDBD_CLOSE_APPROACH_API = 'https://ssd-api.jpl.nasa.gov/cad.api'

// Response request options
const REQUEST_OPTIONS = {
    method: 'GET',
    headers: {
        'Authorization': 'any'
    },

};

//Make the request
fetch(SDBD_CLOSE_APPROACH_API, REQUEST_OPTIONS)

    //Check if response is good
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return response.json();
    })

    .then(requestData => {
        const {count, fields, data} = requestData;
        
    })

    .catch(error => {
        console.error('Error: ', error)
    })



