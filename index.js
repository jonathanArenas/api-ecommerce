const express = require('express')
const router = require('./routes')
const app = express()
// Middlewares --> Obtienen los datos de la petición antes de que lleguen a la ruta
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)
app.listen(3000, (error)=>{
    error ?  console.log(error) : console.log('Server running');
})