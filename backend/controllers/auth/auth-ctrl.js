'use strict'

const JWT = require('../../libs/jwt/index')
const User = require('../../models/user')
const db = require('../../components/db')

module.exports.postRegister = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const {user_id, password} = req.options
    const hash = await User.generatePasswordHash(password)
    const result = await User.createUser({user_id, password: hash.password, salt: hash.salt}, connection)
    const response = await JWT.createToken({user_id})
    await db.commit(connection)
    res.status(201).json({...result, ...response})
  }
  catch (err) {
    await db.rollback(connection)

    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json()
    }
    else next(err)
  }
}

module.exports.postAuth = async (req, res, next) => {
  try {
    const {user_id, password} = req.options

    const user = await User.findOne({user_id})
    if (user && await User.verifyPassword(password, user.password, user.salt)) {
      const response = await JWT.createToken({user_id})
      res.status(200).json(response)
    }
    else {
      res.status(404).json()
    }
  }
  catch (err) {
    next(err)
  }
}

module.exports.deleteAuth = async (req, res, next) => {
  try {
    res.status(201).json()
  }
  catch (err) {
    next(err)
  }
}

/* Refresh Token
module.exports.postRefresh = async (req, res, next) => {
  try {
    const accessToken = await JWT.refreshToken(req.options)
    res.status(200).json({accessToken})
  }
  catch (err) {
    next(err)
  }
}
*/
