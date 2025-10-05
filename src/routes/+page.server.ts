import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type Asteroid = {
	diameter: number,
	velocity: number,
	fullname: string,
}

export const load: PageServerLoad = async ({ params }) => {
	const resp = await fetch("https://ssd-api.jpl.nasa.gov/cad.api?fullname=true&diameter=true", {
		headers: { authorization: "any" }
	});
	const data = await resp.json();
	// console.log(data);

	// Find field locatoins
	let i_m = 0;
	let i_v = 0;
	let i_n = 0;
	for (let i = 0; i < data['fields'].length; i++) {
		let field = data['fields'][i];
		if (field === 'h') {
			i_m = i;
		} else if (field === 'v_rel') {
			i_v = i;
		} else if (field === 'fullname') {
			i_n = i;
		}
	}

	// console.log('Index of magnitude: '+i_m);
	// console.log('Index of velocity: '+i_v);
	// console.log('Index of fullname: '+i_n);

	// Estimate Diameter of asteroid based off magnitude
	function estimateDiameterM(H: number, albedo: number = 0.14): number {
		return (1329 / Math.sqrt(albedo)) * Math.pow(10, -H / 5) * 1000;
	}

	// Parse asteroid data
	let asteroids: Asteroid[] = [];
	// console.log(data['data']);
	for (let dat of data['data']) {
		// console.log(dat);
		asteroids.push({
			diameter: estimateDiameterM(+dat[i_m]),
			velocity: +dat[i_v],
			fullname: dat[i_n],
		});
	}
	// console.log(asteroids);
	return { asteroids: asteroids };
};

