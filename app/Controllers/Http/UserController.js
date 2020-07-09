'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Hash = use('Hash')
const Mail = use('Mail')
const logger = use('App/Helpers/Logger')
const PermissionUser = use('App/Models/PermissionUser')
const genericResponse = use("App/Utils/GenericResponse")
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
      return response.json({message: 'No estas registrado!'})
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
    
    // console.log('genericResponse', genericResponse )
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
    const values = request.only(['email', 'username', 'password' ,'fullname', 'phone'])
    values.rol_id = 1
    const { permissions } = request.only(['permissions'])
    const user = new User()
    user.merge(values)
    const res = await user.save()
    if (res) {
      if (permissions != null && permissions.length) {
        for (const element of permissions) {
            await PermissionUser.findOrCreate(
              { permission_id: element, user_id: user.id },
              { permission_id: element, user_id: user.id }
            )
          }
        }
      await Mail.send('emails.welcome', { token: (user.confirmation_token) ? user.confirmation_token : "verified" }, (message) => {
        message.from('noreply@shop.khare.co.in')
        message.subject('Welcome to Khare\'s Shop')
        message.to(user.email)
      })
      // const result = await auth.withRefreshToken().generate(user)
      await logger('info','User Signup', user.id, user.id, user.email)
      // return response.status(201).json(result)
      let token = await auth
        .withRefreshToken()
        .generate(user)

      let permissionsColl = await user.permissions().fetch()
      user.permissions = permissionsColl.toJSON()
      
      let data = {
        user: user,
        token: token
      }
      return response.json(genericResponse.success(data, "Se creo correctamente"))
    }
    // console.log('values', values)
    

    return response.status(500).json(genericResponse.error(null, 'Algo salió mal. Intenta nuevamente o contacta al administrador.'))
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
    const values = request.only(['email', 'fullname', ,'phone', 'username'])
    let { permissions } = request.only('permissions')
    let id = params.id
    var user = await User.query().where('id', id).first()
    await user.permissions().pivotQuery().whereNotIn('permission_id', permissions).delete()
    for (const element of permissions) {
      await PermissionUser.findOrCreate(
        { permission_id: element, user_id: user.id },
        { permission_id: element, user_id: user.id }
      )
    }
    user.merge(values)
    await user.save()
    let permissionsColl = await user.permissions().fetch()
    user.permissions = permissionsColl.toJSON()
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
    try {
      let user = await User.find(params.id)
      user.delete()

      return response.json(genericResponse.success(null, 'Se ha eliminado con exito'))
    } catch (e) {
      console.log(e)
      return response.json(genericResponse.error(e, 'No existe el usuario!'))
    }
  }

  async changePassword ({ request, auth, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // verify if current password matches
    const verifyPassword = await Hash.verify(
        request.input('password'),
        user.password
    )

    // display appropriate message
    if (!verifyPassword) {
        return response.status(400).json({
            status: 'error',
            message: 'Current password could not be verified! Please try again.'
        })
    }

    // hash and save new password
    user.password = await Hash.make(request.input('newPassword'))
    await user.save()

    return response.json({
        status: 'success',
        message: 'Password updated!'
    })
}
}

module.exports = UserController
