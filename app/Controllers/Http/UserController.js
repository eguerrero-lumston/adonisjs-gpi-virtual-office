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
        user.permissions()
        // let token = await auth.generate(user)
        let token = await auth
          .withRefreshToken()
          .generate(user)
        // Object.assign(user, token)

        let data = {
          user: user,
          token: token
        }
        
        return response.json(genericResponse.success(data, "Se obtuvo el usuario correctamente"))
      }
    } catch (e) {
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
    const page = request.only(['page']) || 1
    const limit = request.only(['limit']) || 20

    const users = await User
                        .query()
                        .where('alive', 1)
                        .with('permissions')
                        .paginate(page, limit)
    
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
    for (const element of permissions) {
      user.permissions().create({ 'permission_id': permissions })
    }
    await user.save()

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
    let id = params.id 
    const user = await User.query().with('permissions').where('id', id).first()
    
    return response.json(genericResponse.success(user, "Se obtuvo el usuario correctamente"))
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
    const values = request.only(['email', 'fullname', ,'phone'])
    const permissions = request.only(['permissions'])
    let id = params.id
    const user = await User.find(id)
    for (const element of permissions) {
      user.permissions().create({ 'permission_id': permissions })
    }
    user.merge(values)
    await user.save()
    // user.fill
    return response.json(genericResponse.success(user, "Se actualizo el usuario correctamente"))
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
    await User.find(params.id).delete()

    return response.json({message: 'Post has been deleted'})

  }
}

module.exports = UserController
