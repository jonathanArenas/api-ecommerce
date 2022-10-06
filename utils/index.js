const jtw = require('jsonwebtoken')

const createToken = (data) =>{
    const token = jtw.sign(data, 'secret', {experesIn: '1h'})
    return token

}
module.exports.createToken