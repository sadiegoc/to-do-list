module.exports = app => {
    function existsOrError (value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    function notExistsOrError (value, msg) {
        try { existsOrError(value, msg) }
        catch (e) { return }
        throw msg
    }

    const save = async (req, res) => {
        const item = { ...req.body }

        try {
            existsOrError(item.description, 'Description not given')
            existsOrError(item.completed, 'Completed not given')
            existsOrError(item.list_id, 'List not given')

            const listAffected = await app.db('list_names').where({ id: item.list_id }).first()
            existsOrError(listAffected, 'List don\'t exists')
        } catch (err) {
            return res.status(400).send(err)
        }

        app.db('list_items')
            .insert(item)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const update = async (req, res) => {
        if (!req.params.id) res.status(400).send('Item not given')
        
        const items = { ...req.body }
        const id = req.params.id

        await app.db.transaction(async trx => {
            for (const key in items) {
                const item = items[key]
                await trx('list_items')
                    .where({ id: item.id, list_id: id })
                    .update({
                        description: item.description,
                        completed: item.completed
                    })
            }
        })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
            
        // app.db('list_items')
        //     .update(item)
        //     .where({ id })
        //     .then(_ => res.status(204).send())
        //     .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        if (!req.params.id) res.status(400).send('Item not given')
        const id = req.params.id
        
        try {
            const rowsDeleted = await app.db('list_items').where({ id }).del()
            existsOrError(rowsDeleted, 'Item don\'t exists')

            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    return { save, update, remove }
}