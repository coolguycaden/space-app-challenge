import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


const REQUEST_OPTIONS = {
    method: 'GET',
    headers: {
        'Authorization': 'any'
    },

};

export const load: PageServerLoad = async ({ params }) => {
    const resp = await fetch('https://ssd-api.jpl.nasa.gov/cad.api?fullname=true', REQUEST_OPTIONS)
        const data = await resp.json();
    return { requestData: data };
};

