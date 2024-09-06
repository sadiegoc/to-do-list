import list from "@/services/list";
import { createStore } from "vuex";

export default createStore({
    state: {
        currentList: [],
        lists: [],
        isMenuHide: false
    },
    mutations: {
        setCurrentList (state, list) {
            state.currentList = list
        },
        loadLists (state) {
            list.getAll()
                .then(response => state.lists = response.data)
                .catch(err => console.log(err))
        }
    }
})