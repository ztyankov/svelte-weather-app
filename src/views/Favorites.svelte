<script>
    import CityCard from '../components/CityCard.svelte';
    import page from 'page';
    import { dispatch } from '../store';
    let cities = ['Sofia', 'Plovdiv', 'Russe'];

    function changeCurrentCity(city) {
        return () => {
            dispatch({
                type: 'SET_CURRENT',
                payload: city,
            });
            page('/');
        };
    }
</script>

<style>
    nav {
        height: 24px;
        margin-bottom: 0;
        margin-left: 8px;
        margin-right: 8px;
    }
</style>

<nav>
    <div>Favorites</div>
    <a href="">Add</a>
</nav>
<main>
    <section>
        {#each cities as city}
            <CityCard city="{city}" on:click="{changeCurrentCity(city)}" />
        {:else}No Favorites yet...{/each}
    </section>
</main>
