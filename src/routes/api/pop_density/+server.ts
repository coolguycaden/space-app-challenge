import type { RequestHandler } from "@sveltejs/kit";

function computeBounds(loc: [number, number], diameter: number) {
	let [lat, lon] = loc;

	const radius = diameter / 2.0;
	const kmPerDeg = 111.32;
	const deltaLat = radius / kmPerDeg;
	const deltaLon =
		radius / (kmPerDeg * Math.cos((lat * Math.PI) / 180));

	let minLat = lat - deltaLat;
	let maxLat = lat + deltaLat;
	let minLon = lon - deltaLon;
	let maxLon = lon + deltaLon;

	return [minLat, maxLat, minLon, maxLon];
}

export const GET: RequestHandler = async ({ url }) => {
	const lon = url.searchParams.get("lon") ?? "0";
	const lat = url.searchParams.get("lat") ?? "0";
	const diameter = url.searchParams.get("diameter") ?? "0";

	const [minLat, maxLat, minLon, maxLon] = computeBounds(
		[parseFloat(lat), parseFloat(lon)],
		parseFloat(diameter),
	);

	// const resp = await fetch(
	// 	`https://wopr.worldpop.org/rest/data/pop/pop/wpgp?min_lat=${minLat}&max_lat=${maxLat}&min_lon=${minLon}&max_lon=${maxLon}`
	// );
	//
	// if (!resp.ok) {
	// 	throw new Error(`Network response was not ok: ${response.statusText}`);
	// }
	//
	// const data = await resp.json();
	//
	// return new Response(JSON.stringify(body), {
	// 	status: response.status,
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });

	return new Response((200000 * Math.random()).toString());
};



