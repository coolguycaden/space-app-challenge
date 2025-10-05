<script lang="ts">
  import { onMount } from "svelte";

  let { location, diameter } = $props();

  async function fetchLocation() {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=json&addressdetails=1`,
      );
      if (!response.ok) throw new Error("uho");

      const data = await response.json();
      return data.display_name;
    } catch (err) {}
  }

  async function fetchPopulation(loc: [number, number]) {
    const bounds = computeBounds(loc);
    const [minLat, maxLat, minLon, maxLon] = bounds;

    const response = await fetch(
    `https://wopr.worldpop.org/rest/data/pop/pop/wpgp?min_lat=${minLat}&max_lat=${maxLat}&min_lon=${minLon}&max_lon=${maxLon}`
    );

    if (!response.ok) throw new Error("Could not fetch pop");

    const data = await response.json();
    return data.geonames[0]?.population ?? "Unknown";
  }

  function computeBounds(loc: [number, number]) {
    const radius = diameter / 2.0;
    const kmPerDeg = 111.32;
    const deltaLat = radius / kmPerDeg;
    const deltaLon =
      radius / (kmPerDeg * Math.cos((location[0] * Math.PI) / 180));

    let [lat, lon] = loc;

    let minLat = lat - deltaLat;
    let maxLat = lat + deltaLat;
    let minLon = lon - deltaLon;
    let maxLon = lon + deltaLon;

    return [minLat, maxLat, minLon, maxLon];
  }

  const addrProm = fetchLocation();
  const popProm = fetchPopulation(location);
</script>

<div>
  <h1>Impact Information</h1>

  {#await addrProm}
    <p>loading...</p>
  {:then address}
    <p>Location: {address}</p>
  {/await}

  <p>Impact Radius: {diameter}</p>

  {#await popProm}
    <p>loading...</p>
  {:then pop}
    <p>Affected Population: {pop}</p>
  {/await}
</div>
