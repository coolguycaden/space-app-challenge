import type { RequestHandler } from "@sveltejs/kit";
import fs from "node:fs/promises";
import geotiffUrl from './gpw_v4_population_count_rev11_2020_2pt5_min.tif?url';
import { fromArrayBuffer } from "geotiff";

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

	return [minLat, maxLon, minLon, maxLat,];
}

export const GET: RequestHandler = async ({ url }) => {
	const lat = parseFloat(url.searchParams.get("lat") ?? "0");
	const lon = parseFloat(url.searchParams.get("lon") ?? "0");
	const diameter = parseFloat(url.searchParams.get("diameter") ?? "0");

	const file = await fs.readFile("." + geotiffUrl);
	const tiff = await fromArrayBuffer(file.buffer);
	const image = await tiff.getImage();
	console.log(tiff);

	// Convert geo coordinate to pixel coordinate:
	const [originX, originY] = image.getOrigin();
	const [resX, resY] = image.getResolution();

	// Calculate pixel coordinates of center point:
	const centerX = Math.round((lon - originX) / resX);
	const centerY = Math.round((originY - lat) / Math.abs(resY)); // Y may be negative

	// Calculate pixel radius:
	const pixelRadius = Math.round(diameter / 2 / Math.abs(resX)); // assuming square pixels

	// Define bounding box window for reading:
	const windowLeft = Math.max(0, centerX - pixelRadius);
	const windowTop = Math.max(0, centerY - pixelRadius);
	const windowWidth = Math.min(image.getWidth() - windowLeft, 2 * pixelRadius);
	const windowHeight = Math.min(image.getHeight() - windowTop, 2 * pixelRadius);

	// Read raster data for bounding window:
	const [populationData] = await image.readRasters({
		window: [windowLeft, windowTop, windowLeft + windowWidth, windowTop + windowHeight]
	});

	let population = 0;
	console.log(populationData);
	for (let y = 0; y < windowHeight; y++) {
		for (let x = 0; x < windowWidth; x++) {
			const dx = x - pixelRadius;
			const dy = y - pixelRadius;
			if (dx * dx + dy * dy <= pixelRadius * pixelRadius) {
				const l = populationData[y * windowWidth + x];
				if (l > 0) {
					population += Math.round(l);
				}
			}
		}
	}

	console.log(population)

	// console.log(populationData.reduce((a, b) => Math.min(a, b)));
	// console.log(populationData.reduce((a, b) => Math.max(a, b)));

	// const [minLat, maxLat, minLon, maxLon] = computeBounds([lat, lon], diameter);

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



