const connect = require('../database')

const productController = {
    list: async (req, res) => {
        try {
            const dbResponse = await connect.query('SELECT * FROM PRODUCT')
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
        const { name, description, price, brand, sku, image, id_category } = req.body
        try {
            const dbResponse = await connect.query(
                'INSERT INTO PRODUCT (name, description, price, brand, sku, image, stock, status, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [name, description, price, brand, sku, image, true, id_category]
            )
            if (dbResponse.rowCount > 0) {
                res.status(201).send({
                    message: 'Succefull  creada'
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
        const id = req.params.idProduct
        try {
            const dbResponse = await connect.query('SELECT * FROM PRODUCT WHERE id = $1', [id])
            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    data: dbResponse.rows
                })
            } else {
                res.status(404).send({
                    message: 'Product not found'
                })
            }
        } catch (error) {
            res.status(404).send({
                error
            })
        }

    },
    update: async (req, res) => {
        const id = req.params.idProduct
        try {
            const {name, description, price, brand, sku, image, stock, status, id_category} = req.body
            const dbResponse = await connect.query(`
        UPDATE PRODUCT
        SET
        name = $1,
        description = $2,
        price = $3,
        brand = $4,
        sku = $5,
        image = $6,
        stock = $7,
        status = $8,
        id_category = 9
        WHERE id = $7`,
                [name, description, price, brand, sku, image, stock, status, id_category, id])

            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    message: "Product modificado"
                })
            } else {
                res.status(409).send({
                    message: "No se pudo modificar este producto."
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
            const dbResponse = await connect.query(`DELETE FROM PRODUCT WHERE id = $1`, [id])

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

module.exports = productController