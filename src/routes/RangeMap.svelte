<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer,
	} from "svelte-maplibre-gl";

	let impactPoint = $state({lat: 40.7,lng: 74});
	const circleRadius = 100;

	//This should be turned into a variable based on user settings
	const metersToPixels = 0.01;

	let {initialImpact = $bindable(), affectedArea = $bindable()} = $props();

	$effect(() => {
		console.log(initialImpact);
		console.log(affectedArea);
	});
	 
	function setImpactPoint(event) {
		const lngLat = event.lngLat;
		impactPoint = {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [lngLat.lng, lngLat.lat],
			},
			properties: {
				radius: circleRadius,
				color: "red",
			},
		};
	}
</script>

<MapLibre
	class="h-full"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={3.5}
	center={{ lng: 137, lat: 36 }}
	id="map"
	onclick={(e) => setImpactPoint(e)}
>
	<NavigationControl />
	<ScaleControl />

	{#if impactPoint}
	<GeoJSONSource
		data={{
			type: "FeatureCollection",
			features: [impactPoint],
		}}
	>
		{#if initialImpact}
			<CircleLayer
				id="impact-circle"
				paint={{
					"circle-radius": [
						"/",
						["get", "radius"],
						initialImpact * metersToPixels,
					],
					"circle-color": ["get", "color"],
					"circle-opacity": 0.6,
				}}
				filter={['==', '$type', 'Point']}
			/>
		{/if}

		{#if affectedArea}
			<CircleLayer
				id="affected-area"
				paint={{
					"circle-radius": ["*", ["get", "radius"], metersToPixels * affectedArea],
					"circle-color": ["get", "color"],
					"circle-opacity": 0.3,
				}}
			/>
		{/if}
	</GeoJSONSource>
	{/if}
</MapLibre>
