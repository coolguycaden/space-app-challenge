<script>
    import GlobalMap from "./GlobalMap.svelte";

    async function (){
        const response = await fetch('/api')
        console.log(response)
    }
</script>


<GlobalMap />
