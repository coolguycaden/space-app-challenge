import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const lat = url.searchParams.get("lat") ?? "0";
	const lon = url.searchParams.get("lon") ?? "0";

	const params = new URLSearchParams({
		lat, lon, format: "json", addressdetails: "1"
	});


	const resp = await fetch(
		`https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
	);

	if (!resp.ok) {
		throw new Error("uho");
	}

	if (!resp.ok) {
		throw new Error(`Network response was not ok: ${resp.statusText}`);
	}

	const data = await resp.json();

	return new Response(data, {
		status: resp.status,
	});
};
