<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    const dispatch = createEventDispatcher();
    export let city;

    function handleClick() {
        dispatch('click', { city });
    }
</script>

<aside in:fly="{{ x: -1000, duration: 500 }}" on:click="{handleClick}">
    <h3>{city}</h3>
</aside>
