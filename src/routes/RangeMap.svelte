<script lang="ts">
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
	} from "svelte-maplibre-gl";
</script>

<MapLibre
	class="h-full"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={3.5}
	center={{ lng: 137, lat: 36 }}
>
	<NavigationControl />
	<ScaleControl />
</MapLibre>
