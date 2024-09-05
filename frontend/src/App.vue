<template>
    <main class="to-do-list">
        <Menu></Menu>
        <Content></Content>
    </main>
</template>

<script>
import Content from './components/Content.vue';
import Menu from './components/Menu.vue';

export default {
    name: 'App',
    components: { Content, Menu }
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
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "menu content" "menu content";
}
</style>