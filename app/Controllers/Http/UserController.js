'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validate } = use('Validator')
const User = use('App/Models/User')
const PermissionUser = use('App/Models/PermissionUser')
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
    const permissions = request.collect(['permissions'])
    const user = await User.create(values)
    for (const element of permissions) {
      const lucidPermission = new PermissionUser()

      console.log("element------->", element)
      lucidPermission.permission_id = element.permissions
      lucidPermission.user_id = user.id
      user.permissions().save(lucidPermission)
    }
    await user.save()

    console.log('values', values)
    let token = await auth
      .withRefreshToken()
      .generate(user)

    let permissionsColl = user.permissions()
    Object.assign(user, permissionsColl)
    
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
    const permissions = request.collect(['permissions'])
    let id = params.id
    const user = await User.query().with('permissions').where('id', id).first()
    // console.log("permissions", permissions)
    if (permissions.length) {
      // await user.permissions().detach()
      for (const element of permissions) {
        const lucidPermission = await PermissionUser.findOrCreate(
          { permission_id: element.permissions, user_id: user.id},
          { permission_id: element.permissions, user_id: user.id }
        )
        // lucidPermission
        // console.log("element------->", element)
        // lucidPermission.permission_id = element.permissions
        // lucidPermission.user_id = user.id
        // user.permissions().save(lucidPermission)
      }
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
    try {
      let user = await User.find(params.id)
      user.delete()

      return response.json(genericResponse.success(null, 'Se ha eliminado con exito'))
    } catch (e) {
      console.log(e)
      return response.json(genericResponse.error(e, 'No existe el usuario!'))
    }
  }
}

module.exports = UserController
