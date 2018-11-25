'use strict'

const ApiRouter = require('../default').ApiRouter
const ctrl = require('./auth-ctrl')

module.exports.postRegister = new ApiRouter({
  name: 'register',
  method: 'post',
  summary: 'Sign up',
  schema: 'PostAuth',
  tags: ['Auth'],
  isPublic: true,
  responses: {
    201: {description: 'Sign up success'},
    409: {description: 'user_id is duplicate'}
  },
  handler: ctrl.postRegister
})

module.exports.postAuth = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Sign In',
  schema: 'PostAuth',
  tags: ['Auth'],
  isPublic: true,
  responses: {
    200: {description: 'Sign in success'},
    404: {description: 'Not found'}
  },
  handler: ctrl.postAuth
})

module.exports.deleteAuth = new ApiRouter({
  name: '',
  method: 'delete',
  summary: 'Sign Out',
  tags: ['Auth'],
  isPublic: true,
  responses: {
    204: {description: 'Sign out success'}
  },
  handler: ctrl.deleteAuth
})

/* Refresh Token
module.exports.postRefresh = new ApiRouter({
  name: 'refresh',
  method: 'post',
  summary: 'Refresh Token',
  schema: 'PostRefreshToken',
  tags: ['Auth'],
  isPublic: true,
  responses: {
    201: {description: 'New access token is created'}
  },
  handler: ctrl.postRefresh
})
*/
