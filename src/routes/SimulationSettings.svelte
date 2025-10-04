<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import type { PageData } from './$types';
    import type { Asteroid } from "./proxy+page.server";


    let data: PageData = $props();
    let asteroids: Asteroid[] = data.asteroids;

    let selectedAsteroidName = $state("");
    const countryTriggerContent = $derived(
        asteroids.find((c) => c.fullname === selectedAsteroidName)?.fullname ??
            "Select an asteroid",
    );
    let selectedAsteroid: Asteroid = $derived(
        asteroids.find((c) => c.fullname === selectedAsteroidName) ?? {
            velocity: 0,
            fullname: "",
            diameter: 0,
        }
    );
</script>

<div class="flex flex-col gap-10">
    <h1>Simulation Options</h1>

    <div class="flex flex-row gap-10">
        <p>Select Asteroid</p>
        <Select.Root type="single" name="asteroid" bind:value={selectedAsteroidName}>
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
    <p>Asterid Stats</p>
    <p>Velocity: {selectedAsteroid.velocity}</p>
    <p>Diameter: {selectedAsteroid.diameter}</p>
    <div class="flex flex-row gap-10">
    </div>

</div>
