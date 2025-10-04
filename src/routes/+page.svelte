<script>
	import GlobalMap from "./GlobalMap.svelte";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import SimulationSettings from "./SimulationSettings.svelte";
  async function name() {
    const paramsObject = {
      diameter: true, // true
      "h-min": 0, // 0
      "h-max": 100, // 100
      "dist-min": 0, // 0
      "dist-max": 100, // 100
      "v-rel-min": 0, // 0
      "v-rel-max": 0, // 0
    };

    const queryString = `?${new URLSearchParams(params).toString()}`;
    const response = await fetch("/api" + queryString);
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
