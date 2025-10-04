<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Slider } from "$lib/components/ui/slider/index.js";
	import { Switch } from "$lib/components/ui/switch/index.js";

	const countries = [
		{ value: "us", label: "United States" },
		{ value: "canada", label: "Canada" },
		{ value: "eu", label: "European Union" },
		{ value: "russia", label: "Russia" },
	];

	let selectValue = $state("");
	const triggerContent = $derived(
		countries.find((c) => c.value === selectValue)?.label ??
			"Select a country",
	);
</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-row gap-10">
		<Label for="amount">Amount Slider</Label>
		<!-- TODO: bind -->
		<Slider
			id="amount"
			type="single"
			max={100}
			step={1}
			class="max-w-[70%]"
		/>
	</div>

	<div>
		<Select.Root type="single" name="country" bind:value={selectValue}>
			<Select.Trigger class="w-[180px]">
				{triggerContent}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Countries</Select.Label>
					{#each countries as country (country.value)}
						<Select.Item
							value={country.value}
							label={country.label}
						>
							{country.label}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex flex-row gap-10">
		<Label>Toggle</Label>
		<Switch />
	</div>
</div>
