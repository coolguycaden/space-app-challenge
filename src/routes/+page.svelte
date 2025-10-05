<script lang="ts">
	import GlobalMap from "./GlobalMap.svelte";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import SimulationSettings from "./SimulationSettings.svelte";
	import RangeMap from "./RangeMap.svelte";

	  import { Button } from "$lib/components/ui/button/index.js";

	import type { PageData, PageProps } from "./$types";
	import type { Asteroid } from "./proxy+page.server";
    import ResizablePaneGroup from "$lib/components/ui/resizable/resizable-pane-group.svelte";
    import ImpactInfo from "./ImpactInfo.svelte";

	let { data }: PageProps = $props();
	let asteroids: Asteroid[] = data.asteroids;
let initialImpact = $state(null);
	let affectedArea = $state(null);
	
	function createImpactRadius() {
		const asteroid = asteroids[0];
		const selectedDensity = 2000;
		const selectedDiameter = asteroid.diameter;
		const selectedVelocity = asteroid.velocity;

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

		return { 
			initialImpact: initialImpact,
			affectedArea: affectedArea,
		};
	}

	
	async function getAsteroidDamage() {
		isLoading = true;

		try {
			const response = await fetch('/api/info_bot', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: name,
					size: size,
					location: location
				})
			});

			if(!response.ok) {
				throw new Error(`An error occured: ${response.statusText}`);
			}

			const impactText = await response.text();
			summary = impactText;

		} catch (e) {
			console.error(e);

		} finally {
			isLoading = false;
		}
	}

	const impactResult = createImpactRadius();
	initialImpact = impactResult.initialImpact;
	affectedArea = impactResult.affectedArea;
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
					<RangeMap bind:initialImpact bind:affectedArea/>
				</Resizable.Pane>
			</Resizable.PaneGroup>

		</Resizable.Pane>
		
		<Resizable.Handle withHandle />
<<<<<<< HEAD
		
		<Resizable.Pane defaultSize={40}>

			<Resizable.PaneGroup direction="vertical">

				<Resizable.Pane defaultSize={20}>
					<div class="flex h-full items-center justify-center p-6">
						<SimulationSettings {asteroids} />
						
					</div>
				</Resizable.Pane>
				<button onclick={sendRequest}> See Impact Results</button>
				<br>
				<Resizable.Handle withHandle />
				<Resizable.Pane defaultSize={20}>
					<div class="flex h-full items-center justify-center p-6">
						<ImpactInfo />
					</div>
				</Resizable.Pane>
				
			</Resizable.PaneGroup>
=======
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full items-center justify-center p-6">
				<SimulationSettings {asteroids} />
			</div>
>>>>>>> 80f200c (Fix get asteroid data for drawing)
		</Resizable.Pane>
		

	</Resizable.PaneGroup>
</div>
