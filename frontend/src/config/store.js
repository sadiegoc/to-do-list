import { createStore } from "vuex";

export default createStore({
    state: {
        currentList: [],
        isMenuHide: false
    },
    mutations: {
        setList (state, list) {
            state.currentList = list
        }
    }
})