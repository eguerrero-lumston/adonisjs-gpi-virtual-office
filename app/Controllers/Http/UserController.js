'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validate } = use('Validator')
const User = use('App/Models/User')
const StoreUser = use('App/Validators/StoreUser')
const genericResponse = use("App/Utils/GenericResponse");
/**../../../../../
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Login a users.
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async login({ request, response, auth }) {
    let { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)

        Object.assign(user, token)
        return response.json(user)
      }


    }
    catch (e) {
      console.log(e)
      return response.json({message: 'You are not registered!'})
    }
  }


  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const users = await User.all()
    
    console.log('genericResponse', genericResponse )
    response.status(200).send(genericResponse.success(users, "Se obtuvieron los usuarios correctamente"))
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    
    const values = request.only(['email', 'username', 'password' ,'fullname', ,'phone'])
    values.rol_id = 1
    const permissions = request.only(['permissions'])
    const user = await User.create(values)
    
    console.log('values', values)
    let token = await auth
      .withRefreshToken()
      .generate(user)
    // Object.assign(user, token)
    
    let data = {
      user: user,
      token: token
    }
    return response.json(genericResponse.success(data, "Se creo correctamente"))
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
