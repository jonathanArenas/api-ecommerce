// req ---> recibe los datos de la peticion
// res ---> responde al cliente
// req.params ---> Recibimos los datos que llegan por la URL pero son obligatorios
// req.query ---> Recibimos los datos que llegan por la URL pero son opcionales
// req.body ---> Recibimos los datos que llegan en el body


const connect = require('../database')
const home = (req, res) =>{
    res.status(200). send({
        message: 'hola mundo' 
    })
}

const suma = (req, res)=>{
    const num1 = parseInt(req.query.num1 )
    const num2 = parseInt(req.query.num2 )
    const sum = num1 + num2
    res.status(200).send({
        message: `resultado: ${sum}` 
    })
}

const user = (req, res)=>{
    const nombre = req.query.nombre
    res.status(200).send({
        message: `usuario: ${nombre}` 
    })
}
const bodyUser = (req, res)=>{
    const user = req.body
    console.log(user)
    res.status(200).send({
        
            "user": user
 
        
    })
}

//  Controladores de Mascotas
const crearMascota = (req, res) => {
  console.log('crear mascota');
  const nombre = req.body.nombre
  const edad = req.body.edad
  console.log(`El nombre de la mascota es ${nombre} y tiene ${edad} años`)

  res.status(201).send({
    message: 'Tu mascota fue creada'
  })
}

const obtenerTodasMascotas = (req, res) => {
  console.log('obtener todas las mascotas');

  res.status(200).send({
    data:[
        {"name": "Mascota 1" },
        {"name": "Mascota 2" },

    ]
  })
}

const obtenerMascota = (req, res) => {
  console.log('obtener una mascota');
}

const modificarMascota = (req, res) => {
  console.log('modificar mascota');
}

const eliminarMascota = (req, res) => {
  console.log('eleminar mascota');
}

// Login
const resgisterController = async (req, res) => {
  const { email, password } = req.body

  try {
    const dbResponse = await connect.query(
      "INSERT INTO admins(email, password) VALUES($1, crypt($2, gen_salt('bf')))",
      [email, password]
    )

    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Admin creado"
      })
    } else {
      res.status(409).send({
        message: "No se pudo crear el admin."
      })
    }
  } catch (error) {
    res.status(409).send({
      error
    })
  }
}


const loginController = async(req, res) =>{
  const {email, bodyPassword} = req.body

  try{
    const dbResponse= await connect.query(
    ''
    )
  }catch(error){

  }


}


module.exports = {
  crearMascota,
  obtenerTodasMascotas,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
  home,
  suma,
  user,
  bodyUser
}
