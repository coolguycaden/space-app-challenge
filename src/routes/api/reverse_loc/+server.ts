import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const lat = url.searchParams.get("lat") ?? "0";
	const lon = url.searchParams.get("lon") ?? "0";

	const params = new URLSearchParams({
		lat, lon,
		format: "json",
		zoom: "10",
	});


	const resp = await fetch(
		`https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
		{
			headers: {
				accept: 'application/json',
				'user-agent': 'nasa-webapp/0.0.1'
			}
		}
	);

	console.log(resp)
	if (!resp.ok) {
		throw new Error("unable to get data");
	}

	const data = await resp.json();

	console.log(data)

	return new Response(JSON.stringify(data), {
		status: resp.status,
	});
};
