<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    
    import type { PageProps } from './$types';
    
    //let data: {PageProps: } = $props();
    let damage = "damage"
</script>

<div class="flex flex-col gap-10">
    <h1>Impact Summary</h1>

    <div class="flex flex-row gap-10">
        <p>{damage}</p>
    </div>

</div>

