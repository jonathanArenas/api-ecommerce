const connect = require('../database')

const userController = {
    list: async (req, res) => {
        try {
            const dbResponse = await connect.query('SELECT * FROM USER')
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
        const { first_name,  last_name, date_birth, gender, email, password, type_user } = req.body
        try {
            const dbResponse = await connect.query(
                'INSERT INTO PRODUCT (first_name, last_name, date_birth, gender, email, password, type_user) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [first_name,  last_name, date_birth, gender, email, password, type_user]
            )
            if (dbResponse.rowCount > 0) {
                res.status(201).send({
                    message: 'Succefull  create'
                })
            } else {
                res.status(409).send({
                    message: 'No se pudo crear el usuario'
                })
            }
        } catch (error) {
            res.status(409).send({
                error
            })

        }
    },
    show: async (req, res) => {
        const id = req.params.idUser
        try {
            const dbResponse = await connect.query('SELECT * FROM USER WHERE id = $1', [id])
            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    data: dbResponse.rows
                })
            } else {
                res.status(404).send({
                    message: 'User not found'
                })
            }
        } catch (error) {
            res.status(404).send({
                error
            })
        }

    },
    update: async (req, res) => {
        const id = req.params.idUser
        try {
            const {first_name,  last_name, date_birth, gender, email, password, type_user} = req.body
            const dbResponse = await connect.query(`
        UPDATE PRODUCT
        SET
        first_name = $1,
        last_name = $2,
        date_birth = $3,
        gender = $4,
        email = $5,
        password = $6,
        type_user = $7,
        WHERE id = $8`,
                [first_name,  last_name, date_birth, gender, email, password, type_user])

            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    message: "Usuario modificado"
                })
            } else {
                res.status(409).send({
                    message: "No se pudo modificar este usuario."
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
            const dbResponse = await connect.query(`DELETE FROM USER WHERE id = $1`, [id])

            if (dbResponse.rowCount > 0) {
                res.status(200).send({
                    message: "usuario eliminado"
                })
            } else {
                res.status(409).send({
                    message: "No se pudo eliminar este usuario."
                })
            }

        } catch (error) {
            res.status(400).send({
                error
            })
        }
    }
    
}

module.exports = userController