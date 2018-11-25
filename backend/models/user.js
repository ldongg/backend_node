'use strict'

const db = require('../components/db')
const crypto = require('crypto')

module.exports.tableName = 'Users'

module.exports.generatePasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(64).toString('base64')
    crypto.pbkdf2(password, salt, 108236, 64, 'sha512', (err, key) => {
      if (err) reject(err)
      resolve({password: key.toString('base64'), salt})
    })
  })
}

module.exports.verifyPassword = (password, hash, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 108236, 64, 'sha512', (err, key) => {
      if (err) reject(err)
      if (key.toString('base64') === hash) resolve(true)
      else resolve(false)
    })
  })
}

module.exports.createUser = async (options, connection) => {
  try {
    const {insertId} = await db.query({
      connection: connection,
      sql: `INSERT INTO ?? SET ?`,
      values: [this.tableName, {user_id: options.user_id, password: options.password, salt: options.salt}]
    })

    options.user_id = insertId
    delete options.password
    delete options.salt
    return options
  }
  catch (err) {
    throw err

  }
}

module.exports.findOne = async (options) => {
  try {
    const result = await db.query({
      sql: `SELECT * FROM ?? WHERE ? LIMIT 1`,
      values: [this.tableName, options]
    })
    return result[0]
  }
  catch (err) {
    throw err
  }
}
