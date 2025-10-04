<script>
	import GlobalMap from "./GlobalMap.svelte";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import SimulationSettings from "./SimulationSettings.svelte";

	async function f() {
		const response = await fetch("/api");
		console.log(response);
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
					<GlobalMap />
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full items-center justify-center p-6">
				<SimulationSettings />
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
