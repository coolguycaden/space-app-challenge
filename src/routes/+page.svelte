<script lang="ts">
	import GlobalMap from "./GlobalMap.svelte";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import SimulationSettings from "./SimulationSettings.svelte";
	import RangeMap from "./RangeMap.svelte";

    import type { PageData } from './$types';
    import type { Asteroid } from "./proxy+page.server";

	let data: PageData = $props();
    let asteroids: Asteroid[] = data.data.asteroids;

    //console.log('hey');
    //console.log(data);
    //console.log(asteroids);
    //console.log('hey');

	async function sendRequest() {
		const paramsObject = {
			diameter: "true",
			"h-min": "0",
			"h-max": "99",
			"dist-min": "0",
			"dist-max": "100",
			"v-rel-min": "0",
			"v-rel-max": "0",
		};

		const queryString = `?${new URLSearchParams(paramsObject).toString()}`;
		const response = await fetch("/api" + queryString);

		console.log(response);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
		} else {
			console.error("Error:", response.statusText);
		}
	}
</script>

<div class="h-screen flex flex-col">
	<Resizable.PaneGroup
		direction="horizontal"
		class="w-full rounded-lg border"
	>
		<Resizable.Pane defaultSize={75}>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane defaultSize={50}>
					<GlobalMap />
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane defaultSize={50}>
					<RangeMap />
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full items-center justify-center p-6">
				<SimulationSettings asteroids={asteroids}/>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
	<button on:click={sendRequest}> Send Request</button>
</div>
