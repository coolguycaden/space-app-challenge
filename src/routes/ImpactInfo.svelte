<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    
    import type { PageProps } from './$types';
    
    let { impactSummary }: { impactSummary: string } = $props();
</script>

<div class="flex flex-col gap-10">
    <h1 class="font-bold">Impact Summary</h1>

    <div class="flex flex-row gap-10">
        <p>{impactSummary}</p>
    </div>

</div>

