const { Pool} = require("pg")
const connect  = new Pool({
  host:"localhost",
  user: "postgres",
  password: "102931416jD4?",
  database: "ecommerce",
  port: "5432"
})

module.exports =connect