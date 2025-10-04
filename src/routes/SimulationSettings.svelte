<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import type { PageData } from './$types';
    import type { Asteroid } from "./proxy+page.server";


    let data: PageData = $props();
    let asteroids: Asteroid[] = data.asteroids;

    let selectedAsteroid = $state("");
    const countryTriggerContent = $derived(
        asteroids.find((c) => c.fullname === selectedAsteroid)?.fullname ??
            "Select an asteroid",
    );

    let meteor = $state({
        size: 42,
        velocity: 67,
    });

    let meteorPresets: { [id: string]: number } = {
        Demi: 8,
        Short: 20,
        Tall: 30,
        Grande: 40,
        Venti: 60,
        Trenta: 75,
        "BIG BERTHA": 100,
    };

    let selectedMeteorPreset = $state("Grande");

    function onMeteorPresetChange(value: string) {
        meteor.size = meteorPresets[value];
        meteor.velocity = meteorPresets[value];
    }

    function onCustomMeteor() {
        selectedMeteorPreset = "Custom";
    }

    let toggle = $state(false);

</script>

<div class="flex flex-col gap-10">
    <h1>Simulation Options</h1>

    <div class="flex flex-row gap-10">
        <p>Select Asteroid</p>
        <Select.Root type="single" name="asteroid" bind:value={selectedAsteroid}>
            <Select.Trigger class="w-[180px]">
                {countryTriggerContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each asteroids as asteroid (asteroid.fullname)}
                        <Select.Item
                            value={asteroid.fullname}
                            label={asteroid.fullname}
                        >
                            {asteroid.fullname}
                        </Select.Item>
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </div>

    <div class="flex flex-row gap-10">
        <p>Meteor Preset</p>
        <Select.Root
            type="single"
            name="country"
            bind:value={selectedMeteorPreset}
            onValueChange={onMeteorPresetChange}
        >
            <Select.Trigger class="w-[180px]">
                {selectedMeteorPreset}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each Object.entries(meteorPresets) as meteor}
                        <Select.Item value={meteor[0]}>
                            {meteor[0]}
                        </Select.Item>
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </div>

    <div class="flex flex-row gap-10">
        <Label for="amount">Asteroid Size</Label>
        <!-- TODO: bind -->
        <Slider
            id="amount"
            type="single"
            max={100}
            step={1}
            class="max-w-[100%]"
            bind:value={meteor.size}
            onValueChange={onCustomMeteor}
        />
    </div>

    <div class="flex flex-row gap-10">
        <Label for="amount">Asteroid Velocity</Label>
        <!-- TODO: bind -->
        <Slider
            id="amount"
            type="single"
            max={100}
            step={1}
            class="max-w-[100%]"
            bind:value={meteor.velocity}
            onValueChange={onCustomMeteor}
        />
    </div>

    <div class="flex flex-row gap-10">
        <Label>Toggle</Label>
        <Switch id="toggle" bind:checked={toggle} />
    </div>
</div>
