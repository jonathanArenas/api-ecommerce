

const connect = require('../database')

const addressController = {


    list: async (req, res) => {
        try {
            const dbResponse = await connect.query('SELECT * FROM PRODUCT_CATEGORIES')
            res.status(200).send({
                data: dbResponse.rows
            })
        } catch (error) {
            res.status(404).send({
                error
            })
        }
    },
    store: async (req, res) => {
        const { name } = req.body
        try {
            const dbResponse = await connect.query(
                'INSERT INTO PRODUCT_CATEGORIES (name, status) VALUES ($1, $2)',
                [name, true]
            )
            if (dbResponse.rowCount > 0) {
                res.status(201).send({
                    message: 'Mascota creada'
                })
            } else {
                res.status(409).send({
                    message: 'No se pudo crear la categoria correspondiente'
                })
            }
        } catch (error) {
            res.status(409).send({
                error
            })

        }
    },
    show: async (req, res) => {
        const id = req.params.idCategorie
        try {
            const dbResponse = await connect.query('SELECT * FROM PRODUCT_CATEGORIES WHERE id = $1', [id])
            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    data: dbResponse.rows
                })
            } else {
                res.status(404).send({
                    message: 'Categoría no encontrada'
                })
            }
        } catch (error) {
            res.status(404).send({
                error
            })
        }

    },
    update: async (req, res) => {
        const id = req.params.idCategorie
        const { name, status } = req.body
        try {
            const dbResponse = await connect.query(`
        UPDATE PRODUCT_CATEGORIES
        SET
        name = $1,
        status = $2
        WHERE id = $3`,
                [name, status, id])

            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    message: "Categoría modificada"
                })
            } else {
                res.status(409).send({
                    message: "No se pudo modificar esta categoría."
                })
            }

        } catch (error) {
            res.status(400).send({
                error
            })
        }

    },
    destroy: async (req, res) => {
        const id = req.params.idMascota
        try {
            const dbResponse = await connect.query(`DELETE FROM PRODUCT_CATEGORIES WHERE id = $1`, [id])

            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    message: "Categoría eliminada"
                })
            } else {
                res.status(409).send({
                    message: "No se pudo eliminar la mascota en este momento."
                })
            }

        } catch (error) {
            res.status(400).send({
                error
            })
        }
    }

}

module.exports = addressController