<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer,
	} from "svelte-maplibre-gl";

	let { selectedDiameter, onMapClick }: {
		selectedDiameter: number;
		onMapClick: (coords: { lng: number; lat: number }) => void;
	} = $props();

	let impactPoint;
	let showImpact = $state(false);
		
	function setImpactPoint(event) {
		if (selectedDiameter === 0) {
			alert("Please select an asteroid.");
			return;
		}

		const lngLat = event.lngLat;
		onMapClick(lngLat);
		
		const pixelRadius = selectedDiameter / 20;

		impactPoint = {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [lngLat.lng, lngLat.lat],
			},
			properties: {
				radius: pixelRadius,
				color: 'red'
			}
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
				<CircleLayer
					id="impact-circle"
					paint={{
						'circle-radius': ['get', 'radius'],
						'circle-color': ['get', 'color'],
						'circle-opacity': 0.6
					}}
				/>
			</GeoJSONSource>
		{/if}
</MapLibre>
