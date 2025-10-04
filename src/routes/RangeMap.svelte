<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GeoJSONSource,
		CircleLayer
	} from "svelte-maplibre-gl";

	let impactPoint;
	type PointFeature = GeoJSON.Feature<GeoJSON.Point, { radius: number; color: string }>;
	

	function setImpactPoint(event) {
		impactPoint = `${JSON.stringify(event.point)}`;
		console.log(impactPoint);
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
</MapLibre>
