<script lang="ts">
	import { onMount } from "svelte";

	let { location, diameter } = $props();

	async function fetchLocation(loc: [number, number]) {
		const [lat, lon] = loc;
		try {
			const params = new URLSearchParams({
				lat: lat.toString(),
				lon: lon.toString(),
			});
			const response = await fetch(
				`/api/reverse_loc?${params.toString()}`,
			);
			if (!response.ok) throw new Error("uho");

			const data = await response.json();
			return data.display_name;
		} catch (err) {}
	}

	async function fetchPopulation(loc: [number, number], diameter: number) {
		const [lat, lon] = loc;
		const params = new URLSearchParams({
			lat: lat.toString(),
			lon: lon.toString(),
			diameter: diameter.toString(),
		});
		const response = await fetch(`/api/pop_density?${params.toString()}`);

		if (!response.ok) throw new Error("Could not fetch pop");

		const data = await response.json();
		return data;
	}

	const addrProm = fetchLocation(location);
	const popProm = fetchPopulation(location, diameter);
</script>

<div>
	<h1>Impact Information</h1>

	{#await addrProm}
		<p>loading...</p>
	{:then address}
		<p>Location: {address}</p>
	{/await}

	<p>Impact Radius: {diameter}</p>

	{#await popProm}
		<p>loading...</p>
	{:then pop}
		<p>Affected Population: {pop}</p>
	{/await}
</div>
