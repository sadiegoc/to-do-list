<template>
    <main class="to-do-list" :class="{ 'hide-menu': isMenuHide }">
        <Menu></Menu>
        <Content></Content>
    </main>
</template>

<script>
import { mapState } from 'vuex';
import Menu from './components/Menu.vue';
import Content from './components/Content.vue';

export default {
    name: 'App',
    components: { Menu, Content },
    computed: mapState(['isMenuHide'])
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    font-family: monospace;
    font-size: 1rem;
    font-weight: 100;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin: 0; padding: 0;

    position: relative; inset: 0;
}

.to-do-list {
    position: absolute; inset: 0;

    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "menu content";
}

.to-do-list.hide-menu {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "content";
}

@media (max-width: 600px) {
    .to-do-list {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: "content";
    }
}
</style>