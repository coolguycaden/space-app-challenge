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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8f6b1fa63b2f31fd95e0f25b1ea82fb49144c903
		{/if}
	</GeoJSONSource>
	{/if}
</MapLibre>
