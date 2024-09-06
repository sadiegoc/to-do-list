import http from "./http";

class List {
    getAll () {
        return http.get('/to-do')
    }

    getOne (id) {
        return http.get(`/to-do/${id}`)
    }

    saveList (data) {
        return http.post('/to-do', data)
    }

    update (data, id) {
        return http.patch(`/to-do/${id}`, data)
    }

    delete (id) {
        return http.delete(`/to-do/${id}`)
    }
}

export default new List()