<template>
    <aside class="menu" v-show="!isMenuHide">
        <button class="toggle-menu" @click.prevent="this.$store.state.isMenuHide = !isMenuHide">
            <img v-if="isMenuHide" src="@/assets/imgs/right-arrow.png" alt="Show">
            <img v-else src="@/assets/imgs/left-arrow.png" alt="Hide">
        </button>
        <div class="container">
            <form class="add" @submit.prevent="add">
                <input type="text" v-model="listName" placeholder="Add new list">
                <button type="submit">
                    <img src="@/assets/imgs/add-1.png" alt="Add">
                </button>
            </form>
            <ul class="lists">
                <li class="list-name" v-for="list in lists" :key="list.id">
                    <a href @click.prevent="selectList(list.id)">
                        {{ list.name }}
                    </a>
                    <span @click.prevent="remove(list.id)">
                        <img src="@/assets/imgs/trash.png" alt="Delete">
                    </span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import list from '@/services/list';
import { mapState } from 'vuex';

export default {
    name: 'MenuComponent',
    computed: mapState(['isMenuHide', 'currentList', 'lists']),
    data: function () {
        return {
            listName: ""
        }
    },
    methods: {
        add () {
            if (this.listName) {
                list.saveList({ name: this.listName})
                    .then(() => {
                        this.loadLists()
                        this.listName = ""
                    })
                    .catch(err => console.log(err))
            }
        },
        async selectList (id) {
            await list.getOne(id).then(res => this.$store.commit('setCurrentList', res.data)).catch(err => console.log(err))
        },
        remove (id) {
            list.delete(id)
                .then(() => this.loadLists())
                .catch(err => console.log(err))
            this.$store.commit('setCurrentList', [])
        }
    },
    mounted () {
        this.$store.commit('loadLists')
    }
}
</script>

<style scoped>
aside {
    grid-area: menu;
    background-color: #1C0F13;
}

.container {
    padding: 0 10px;
}

.lists {
    list-style: none;
    padding: 0; margin: 0;
}

.list-name {
    border: 1px solid #BBBAC6;
    border-radius: 5px;
    padding: 0; margin: 6px auto;
    
    display: flex; flex-direction: row;
    justify-content: space-between; align-items: center;
}

.list-name a {
    color: white;
    flex-grow: 1; text-decoration: none;
    padding: 5px 8px;
}

.list-name span {
    padding: 3px; margin: 0 5px;
}

.list-name:hover {
    background-color: #BBBAC6;
    cursor: pointer;
}

.list-name:hover a {
    color: #1C0F13;
}

.list-name span:hover {
    background-color: #3f3034;
    border-radius: 4px;
}

.list-name a, .list-name span {
    display: flex; align-items: center;
}

.add {
    display: flex; flex-direction: row;
    justify-content: space-between; align-items: center;

    height: 36px; margin: 10px 0;
}

.add input {
    flex-grow: 1;
    
    border: none; outline: none;
    background-color: #3f3034;
    color: white;

    padding: 0 15px; height: 36px;
    border-radius: 5px;
}

.add button {
    border: none; background: transparent;
    cursor: pointer;
    
    display: flex; align-items: center;
    text-align: center;

    width: 36px; height: 36px;
}

.toggle-menu {
    border: none;
    cursor: pointer;
    background: transparent;
    width: 100%; height: 40px;
    padding: 0 10px;

    display: none; flex-grow: 1;
    justify-content: flex-end; align-items: center;
}

@media (max-width: 600px) {
    aside {
        position: absolute;
        inset: 0; width: 300px;
    }

    .toggle-menu {
        display: flex;
    }
}
</style>