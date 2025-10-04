<script lang="ts">
	import { Tween } from "svelte/motion";

	import { MapLibre, Projection, Light, Sky } from "svelte-maplibre-gl";

	let thetaDeg = new Tween(0);
	let p = $derived(
		(Math.acos(Math.cos((thetaDeg.target / 180 + 1) * Math.PI)) / Math.PI) *
			180,
	);
	let a = $derived(
		90 +
			(Math.atan2(0, Math.sin((thetaDeg.target / 180 + 1) * Math.PI)) /
				Math.PI) *
				180,
	);

	const interval = setInterval(() => {
		thetaDeg.set(thetaDeg.current + 0.5);
	}, 500);
	$effect(() => {
		return () => clearInterval(interval);
	});
</script>

<MapLibre
	class="h-full"
	style={{
		version: 8,
		sources: {
			satellite: {
				type: "raster",
				tiles: [
					"https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
				],
				tileSize: 256,
			},
		},
		layers: [
			{
				id: "satellite",
				type: "raster",
				source: "satellite",
			},
		],
	}}
	zoom={1.5}
>
	<Light anchor="map" position={[100, a, p]} />
	<Sky
		atmosphere-blend={[
			"interpolate",
			["linear"],
			["zoom"],
			0,
			1,
			5,
			1,
			7,
			0,
		]}
	/>

	<Projection type="globe" />
</MapLibre>
