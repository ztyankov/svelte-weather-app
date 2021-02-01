<script>
    import router from 'page';
    import Current from './views/Current.svelte';
    import Favorites from './views/Favorites.svelte';
    import Add from './views/Add.svelte';

    let page, params;

    router('/', navigateTo(Current));
    router('/favorites', navigateTo(Favorites));

    router.start();

    function navigateTo(Component) {
        return (context) => {
            page = Component;
            params = context.params;
        };
    }
</script>

<svelte:component this="{page}" params="{params}" />
