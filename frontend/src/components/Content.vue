<template>
    <article class="content">
        <div class="head">
            <button class="toggle-menu" @click.prevent="this.$store.state.isMenuHide = !isMenuHide">
                <img v-if="isMenuHide" src="@/assets/imgs/right-arrow.png" alt="Show">
                <img v-else src="@/assets/imgs/left-arrow.png" alt="Hide">
            </button>
            <h1 v-if="this.currentList.id">
                <input type="text" v-model="this.currentList.name">
            </h1>
        </div>
        <div class="container">
            <ul class="list">
                <li class="item">
                    <input type="text" :disabled="!this.currentList.id" v-model="newItem">
                    <span class="icon" @click.prevent="add">
                        <img src="@/assets/imgs/add-2.png" alt="Add" width="16px">
                    </span>
                </li>
                <li class="item" v-for="item in currentList.items" :key="item.id">
                    <label class="checkbox">
                        <input type="checkbox" v-model="item.completed">
                        <span class="checkmark"></span>
                    </label>
                    <input type="text" v-model="item.description">
                    <span class="icon" @click.prevent="remove(item.id)">
                        <img src="@/assets/imgs/trash.png" alt="Delete">
                    </span>
                </li>
            </ul>
            <button class="save" @click.prevent="save">Save</button>
        </div>
    </article>
</template>

<script>
import item from '@/services/item';
import list from '@/services/list';
import { mapState } from 'vuex';

export default {
    name: 'ContentComponent',
    computed: mapState(['currentList', 'isMenuHide', 'lists']),
    data: function () {
        return {
            newItem: "",
            listName: ""
        }
    },
    methods: {
        toggleMenu () {
            this.isMenuHide = !this.isMenuHide
        },
        remove (id) {
            this.currentList.items = this.currentList.items.filter(item => item.id !== id)
            item.delete(id).catch(err => console.log(err))
        },
        save () {
            if (this.currentList.id) {
                item.update(this.currentList.items, this.currentList.id)
                    .catch(err => console.log(err))

                const listToSave = { name: this.currentList.name }
                list.update(listToSave, this.currentList.id)
                    .then(() => this.$store.commit('loadLists'))
                    .catch(err => console.log(err))
            }
        },
        add () {
            if (this.newItem) {
                const itemToSave = { description: this.newItem, list_id: this.currentList.id }
                item.save(itemToSave)
                    .then(() => {
                        list.getOne(this.currentList.id).then(res => {
                            this.$store.commit('setCurrentList', res.data)
                            this.newItem = ""
                        })
                    })
                    .catch(err => console.log(err))
            }
        }
    }
}
</script>

<style scoped>
article {
    grid-area: content;
    background-color: #BBBAC6;

    display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-start;
}

.head {
    box-sizing: border-box;
    display: flex; align-items: center;
    padding: 6px; width: 100%;
}

.head button {
    border: none; background-color: #1C0F13;
    border-radius: 5px; cursor: pointer;
    width: 40px; height: 40px;

    display: flex;
    justify-content: center; align-items: center;
}

.head h1 {
    margin: 6px;
    display: flex; align-items: center;
    flex-grow: 1;
}

.head h1 input {
    width: 100%; border: none; outline: none;
    background: transparent; color: black;
    font-size: 1.1rem;
}

.container {
    width: 100%;
}

.container .list {
    margin: auto; padding: 0;
    width: 90%;
    list-style: none;
}

.list .item {
    display: flex; flex-direction: row;
    justify-content: space-between; align-items: center;
}

.item .icon, .item .checkbox {
    padding: 0 5px; cursor: pointer;
}

.item input[type="checkbox"] {
    display: none;
}

.item .checkmark {
    display: block;
    cursor: pointer;
    background-color: transparent;
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 1px solid #eee;
}

.item input[type="checkbox"]:hover ~ .checkmark {
    background-color: #eee;
}

.item input[type="checkbox"]:checked ~ .checkmark {
    background-color: #1C0F13;
    border-color: #1C0F13;
}

.list input[type="text"] {
    border: 1px solid transparent; outline: none;
    padding: 6px 10px; margin: 2px 0;
    border-radius: 5px;
    width: 100%;
    background-color: #eee;
}

.list input[type="text"]:hover {
    border: 1px solid #fff;
}

.save {
    border: none; outline: none;
    background-color: #1C0F13;
    padding: 8px 12px; margin: 6px;
    color: white; border-radius: 5px;
    cursor: pointer;
}
</style>