'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthIsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth }, next) {
    // call next to advance the request
    let user = await auth.getUser()
    // console.log('user', user)
    // if (user.rol_id != 1 ) {
    //     console.log('not is admin')
    //     return 
    // }
    await next()
  }
}

module.exports = AuthIsAdmin
