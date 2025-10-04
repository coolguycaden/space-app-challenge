import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const SDBD_CLOSE_APPROACH_API = 'https://ssd-api.jpl.nasa.gov/cad.api'

export const GET: RequestHandler = async  ({ url }) => {
    const params = Object.fromEntries(url.searchParams);
    const index = url.toString().indexOf('?');

    let apiRequest = SDBD_CLOSE_APPROACH_API;

    if(index !== -1){
        apiRequest += url.toString().substring(index, url.toString().length);
    } else {
        throw new Error("url provided is not acceptable");
    }
    
    const response = await fetch(apiRequest);

    if(!response.ok){
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const body = await response.json();
    return new Response(JSON.stringify(body), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};



