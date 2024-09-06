module.exports = app => {
    app.route('/to-do')
        .get(app.controllers.list.get)
        .post(app.controllers.list.save)
    
    app.route('/to-do/:id')
        .get(app.controllers.list.get)
        .patch(app.controllers.list.update)
        .delete(app.controllers.list.remove)
    
    app.route('/to-do/list')
        .post(app.controllers.item.save)
    
    app.route('/to-do/list/:id')
        .patch(app.controllers.item.update)
        .delete(app.controllers.item.remove)
}