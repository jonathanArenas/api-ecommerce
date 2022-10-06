const connect = require('../database')
const { createToken } = require('../utils')

const loginController = {
    signup: async (req, res) => {
        const { first_name, email, password, type_user= 'CUSTOMER' } = req.body
        try {
            console.log("error")
            const dbResponse = await connect.query(
                'INSERT INTO users(first_name, email, password, type_user) VALUES($1, $2,  crypt($3, gen_salt("bf")), $4)',
                [first_name, email, password, type_user]
            )
            
            if (dbResponse.rowCount > 0) {
                res.status(201).send({
                    message: "user creado"
                })
            } else {
                res.status(409).send({
                    message: "No se pudo crear el usuario."
                })
            }
        } catch (error) {
            console.log(error)
            res.status(409).send({
                error
            })
        }
    },

    signin: async (req, res) => {
        console.log("En login")
        const { email, password } = req.body
        

  try {
    const dbResponse = await connect.query(
      "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)",
      [email, password]
    )

    if (dbResponse.rowCount > 0) {
      const data = {
        id: dbResponse.rows[0].id,
        email: dbResponse.rows[0].email,
        type_user: dbResponse.rows[0].type_user
      }

      const token = createToken(data)

      res.status(200).send({
        data: token
      })
    } else {
      res.status(404).send({
        message: "Usuario o contraseña incorrectos."
      })
    }
  } catch (error) {
    res.status(404).send({
      error
    })
  }
    }
}

module.exports = loginController