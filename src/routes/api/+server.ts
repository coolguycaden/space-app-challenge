import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
    

    const params = Object.fromEntries(url.searchParams);
    /*
        diameter - outputs the diameter of the body

        body - use Earth for the close-approach body.

        h - absolute magnitude 

        des - Destination of the asteroid/comet

        dist - Distance

        dist-min - Min approach dist

        dist-max - Max approach dist

        v_rel - velocity relative to the apporach body (Earth)

        orbit_id - used for the close-approach computation




    */



    // const {
    //     body, diameter, h, des, dist, 
    //     'dist-min': distMin, 'dist-max': distMax, v_rel, orbit_id
    //     } = Object.fromEntries(url.searchParams)
    // const {count, fields, data}

    // const {
    //     h,
    //     'dist-min': distMin,
    //     'distMax': distMax,
    //     v_rel,
    //     orbit_id,
    // } = params;

    // const hNum = Number(h ?? 0);
    // const distMinNum = Number(distMin ?? 0);
    // const distMaxNum = Number(distMax ?? 0);
    // const v_relNum = Number(v_rel ?? 0);
    // const orbit_idNum = Number(orbit_id ?? 0);

    // const { 
    //     body, 
    //     des = {
    //         hNum, distMinNum, distMaxNum, v_relNum, orbit_idNum
    //     } 
    // } = params;

    return new Response(String(params));
};

// const SDBD_CLOSE_APPROACH_API = 'https://ssd-api.jpl.nasa.gov/cad.api'

// // Response request options
// const REQUEST_OPTIONS = {
//     method: 'GET',
//     headers: {
//         'Authorization': 'any'
//     },

// };

// //Make the request
// fetch(SDBD_CLOSE_APPROACH_API, REQUEST_OPTIONS)

//     //Check if response is good
//     .then(response => {
//         if(!response.ok) {
//             throw new Error('Network response was not ok.');
//         }

//         return response.json();
//     })

//     //
//     .then(requestData => {
//         const {count, fields, data} = requestData;
//         const {dist, dist_min, dist_max} = data
//     })

//     .catch(error => {
//         console.error('Error: ', error)
//     })



