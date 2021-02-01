<script>
    import Weather from '../components/Weather.svelte';
    import { getJSON } from '../lib/async';
    import { onMount } from 'svelte';
    import { store } from '../store';

    let weatherReport = {};
    let unit = 'c';

    async function getWeather() {
        const current = $store.current.toLowerCase().replace(' ', '');

        return getJSON(`/api/weather?city=${current}&country=bg`).then((result) => ({
            city: `${result.city_name}`,
            temperature: `${result.temp}`,
            icon: result.weather.icon,
            description: result.weather.description,
        }));
    }

    onMount(async () => {
        weatherReport = await getWeather();
    });
</script>

<style>
    nav {
        margin-bottom: 0;
        margin-left: 8px;
        margin-right: 8px;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<nav>
    <div>
        <a on:click|preventDefault="{() => (unit = 'f')}" href="/#">F</a>
        |
        <a on:click|preventDefault="{() => (unit = 'c')}" href="/#">C</a>
    </div>
    <a href="/favorites">Favorites</a>
</nav>
<main>
    {#if !weatherReport}
        Loading...
    {:else}
        <Weather {...weatherReport} unit="{unit}" />
    {/if}
</main>
