<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer
	} from "svelte-maplibre-gl";

	let impactPoint;
	const circleRadius = 100;	
	let showImpact = $state(false);

	//This should be turned into a variable based on user settings
	const metersToPixels = 0.0001;
	const tempMeters = 10000;
	let initalImpact = metersToPixels * tempMeters;

	function setImpactPoint(event) {
		const lngLat = event.lngLat;
		impactPoint = {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [lngLat.lng, lngLat.lat]
			},
			properties: {
				radius: circleRadius,
				color: 'red'
			}
		};
		showImpact = !showImpact;
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

		
		{#if showImpact}
			<GeoJSONSource
				data={{
					"type": "FeatureCollection",
					"features": [impactPoint]
				}}
			>
				<CircleLayer
					id="impact-circle"
					paint={{
						
						'circle-radius': ['*', ['get', 'radius'], initalImpact], 
						'circle-color': ['get', 'color'],
						'circle-opacity': 0.6,
					}}
				/>

				<CircleLayer
				id="affected-area"
				paint={{
					'circle-radius': ['*', ['get', 'radius'], affectedArea],
					'circle-color': ['get', 'color'],
					'circle-opacity': 0.3,
					}}
				/>
			</GeoJSONSource>
		{/if}
</MapLibre>
