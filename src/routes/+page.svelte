<script lang="ts">
	import GlobalMap from "./GlobalMap.svelte";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import SimulationSettings from "./SimulationSettings.svelte";
	import RangeMap from "./RangeMap.svelte";

	import type { PageData } from "./$types";
	import type { Asteroid } from "./proxy+page.server";

	let data: PageData = $props();
	let requestData = data.requestData;
	//let impactResult = impact.result;

	const asteroids: Asteroid[] = [];

	async function sendRequest() {
		const paramsObject = {
			diameter: "true",
			"h-min": "0",
			"h-max": "99",
			"dist-min": "0",
			"dist-max": "100",
			"v-rel-min": "0",
			"v-rel-max": "100",
		};

		const queryString = `?${new URLSearchParams(paramsObject).toString()}`;
		const response = await fetch("/api" + queryString);

		if (response.ok) {
			const data = await response.json();
		} else {
			console.error("Error:", response.statusText);
		}

		//impactResult = createImpactRadius(data);
	}

	function createImpactRadius(asteroidSettings) {
		const { selectedDiameter, selectedVelocity, selectedDensity } =
			Object.fromEntries(asteroidSettings);

		const minDensityPercentage = 1;
		const maxDensityPercentage = 100;
		const minDensity = 2000;
		const maxDensity = 3000;

		const density =
			minDensity +
			((selectedDensity - minDensityPercentage) *
				(maxDensity - minDensity)) /
				(maxDensityPercentage - minDensityPercentage);
		const mass = (4 / 3) * Math.PI * (selectedDiameter / 2) ** 3 * density;
		const epilson = 0.5 *  mass * ((selectedVelocity * 1000) ** 2);
		const kappa = epilson / (4.184 * 10 ** 12);
		const initialImpact = 0.07 * 1.3 * kappa;
		const affectedArea = initialImpact * 1.5;

		return { initialImpact, affectedArea };
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
				<SimulationSettings {asteroids} />
			</div>
			<button onclick={sendRequest}> See Impact </button>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
