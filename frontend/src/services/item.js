import http from "./http";

class Item {
    save (data) {
        return http.post('/to-do/list', data)
    }

    update (data, id) {
        return http.patch(`/to-do/list/${id}`, data)
    }

    delete (id) {
        return http.delete(`/to-do/list/${id}`)
    }
}

export default new Item()