import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {

	let resp = await fetch("/api")
	console.log(resp)
	return await resp.json()
};