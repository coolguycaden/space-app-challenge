<script lang="ts">
	// @ts-ignore
	import MapLibre from "svelte-maplibre/MapLibre.svelte";
	import type { LngLatBoundsLike } from "maplibre-gl";

	let bounds: LngLatBoundsLike = $state([-32, -8, 63, 41]);
	let displayBounds = $derived(bounds.map((b) => b.toFixed(4)).join(", "));
</script>

<MapLibre
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class="relative h-full w-full"
	standardControls
	bind:bounds
/>
