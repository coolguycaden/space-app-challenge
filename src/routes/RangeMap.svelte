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
	const initalImpact = 1;


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
			</GeoJSONSource>
		{:else}
			<GeoJSONSource
				data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
			>
				<CircleLayer
					filter={['has', 'point_count']}
					paint={{
						'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 50, '#f1f075', 150, '#f28cb1'],
						'circle-radius': ['+', 10, ['sqrt', ['get', 'point_count']]],
						'circle-opacity': 0.8
					}}
				/>
			</GeoJSONSource>
		{/if}
</MapLibre>
