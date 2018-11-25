const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync(`${__dirname}/private.pem`)
const publicKey = fs.readFileSync(`${__dirname}/public.pem`)

/* Refresh Token
const privateRefreshKey = fs.readFileSync(`${__dirname}/private-ref.pem`)
const publicRefreshKey = fs.readFileSync(`${__dirname}/public-ref.pem`)

module.exports.refreshToken = async (options) => {
  try {
    const payload = await jwt.verify(options.accessToken, publicKey, {algorithms: 'RS256', ignoreExpiration: true})
    await jwt.verify(options.refreshToken, publicRefreshKey, {algorithms: 'RS256'})
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti
    return await generateToken(payload,)
  } catch (err) {
    throw {status: 401, message: err}
  }
}
*/

module.exports.createToken = async (data) => {
  try {
    const payload = {
      sub: data.user_id
    }
    const accessToken = await generateToken(payload)
    return {accessToken}
  } catch (err) {
    throw err
  }
}

async function generateToken(payload) {
  try {
    return await jwt.sign(payload, privateKey,
      {
        algorithm: 'RS256',
        expiresIn: 60 * 60 * 2
      })
  } catch (err) {
    throw err
  }
}

module.exports.decodeToken = async (token) => {
  try {
    if (token && token.split(' ')[0] === 'Bearer') {
      return await jwt.verify(token.split(' ')[1], publicKey, {algorithms: 'RS256'})
    }
    else {
      throw 'AccessToken is empty'
    }
  } catch (err) {
    throw {status: 401, message: err}
  }
}

