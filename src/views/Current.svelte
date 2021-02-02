<script>
    import Weather from '../components/Weather.svelte';
    import { getJSON } from '../lib/async';
    import { onMount } from 'svelte';
    import { store, dispatch } from '../store';
    import { fade } from 'svelte/transition';
    import { unitTypes, temperatureUnits } from '../lib/constants';

    let weatherReport = null;
    let units = $store.units;

    function changeUnits(unitType) {
        return () => {
            dispatch({
                type: 'SET_UNITS',
                payload: unitType,
            });
        };
    }

    async function getWeather() {
        const current = $store.city.toLowerCase().replace(' ', '');

        return getJSON(`/api/weather?city=${current}&country=bg&units=${unitTypes.metric}`).then(
            (result) => ({
                city: `${result.city_name}`,
                temperature: `${result.temp}`,
                icon: result.weather.icon,
                description: result.weather.description,
                baseUnits: unitTypes.metric,
            })
        );
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

<div in:fade="{{ duration: 500 }}">
    <nav>
        <div>
            <a on:click|preventDefault="{changeUnits(unitTypes.fahrenheit)}" href="/#">F</a>
            |
            <a on:click|preventDefault="{changeUnits(unitTypes.metric)}" href="/#">C</a>
        </div>
        <a href="/favorites">Favorites</a>
    </nav>
    <main>
        {#if !weatherReport}
            Loading...
        {:else}
            <Weather {...weatherReport} />
        {/if}
    </main>
</div>
