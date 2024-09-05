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

    const get = async (req, res) => {
        const id = req.params.id || null

        if (id) {
            await app.db('list_names')
                .leftJoin('list_items', 'list_names.id', '=', 'list_items.list_id')
                .select(
                    'list_names.id as listId',
                    'list_names.name as listName',
                    'list_items.id as itemId',
                    'list_items.description as itemDesc'
                )
                .where('list_names.id', id)
                .then(results => {
                    const list = {
                        id: results[0].listId,
                        name: results[0].listName,
                        items: results.filter(row => row.itemId).map(row => ({
                            id: row.itemId,
                            description: row.itemDesc
                        }))
                    }

                    res.status(200).json(list)
                })
                .catch(err => res.status(500).send(err))
        } else {
            app.db('list_names')
                .select()
                .then(lists => res.status(200).json(lists))
                .catch(err => res.status(500).send(err))
        }
    }

    const save = async (req, res) => {
        if (!req.body.name) res.status(400).json({ message: 'Fields cannot be empty' })
            
        const list = { name: req.body.name }
        try {
            const listAffected = await app.db('list_names').where({ name: list.name }).first()
            notExistsOrError(listAffected, 'This list already exists')
        } catch (err) {
            return res.status(400).send(err)
        }

        app.db('list_names')
            .insert(list)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const update = async (req, res) => {
        if (!req.params.id) res.status(400).send('List not given')
        if (!req.body.name) res.status(400).send('Fields cannot be empty')
        
        const list = { name: req.body.name }
        const id = req.params.id

        app.db('list_names')
            .update(list)
            .where({ id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        if (!req.params.id) res.status(400).send('List not given')
        const id = req.params.id
        
        try {
            const rowsDeleted = await app.db('list_names').where({ id }).del()
            existsOrError(rowsDeleted, 'List don\'t exists')
            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    return { save, update, remove, get }
}