<template>
    <article class="content">
        <div class="container">

        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ContentComponent',
    computed: mapState(['currentList'])
}
</script>

<style scoped>
article {
    grid-area: content;
    background-color: #BBBAC6;
}
</style>