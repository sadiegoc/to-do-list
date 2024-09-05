import { createStore } from "vuex";

export default createStore({
    state: {
        currentList: []
    },
    mutations: {
        setList (state, listId) {
            state.currentList = listId
            console.log('recebi o id: ', listId)
        }
    }
})