'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Seller = use('App/Models/Seller')
const User = use('App/Models/User')
const _ = use('lodash')
const { validate } = use('Validator')
const genericResponse = use("App/Utils/GenericResponse")
/**
 * Resourceful controller for interacting with sellers
 */
class SellerController {
  /**
   * Show a list of all sellers.
   * GET sellers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const page = request.only(['page']) || 1
    const limit = request.only(['limit']) || 20

    const users = await Seller
                        .query()
                        .where('alive', 1)
                        .with('user')
                        .orderBy('status', 'desc')
                        .paginate(page, limit)
    
    // console.log('genericResponse', genericResponse )
    response.status(200).send(genericResponse.success(users, null))
  }

  /**
   * Create/save a new seller.
   * POST sellers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // username, email, password, loteName, address, tel1, tel2, tel3, rfc, state, zip_code, user_id
    const oldvalues = request.only(['email', 'loteName', 'address', 'tel1', 'tel2', 'tel3', 'rfc', 'state', 'zipCode'])
    var values = _.mapKeys(oldvalues, (value, key) => _.snakeCase(key))
    const valuesUser = request.only(['username', 'email', 'password', 'fullname'])
    valuesUser.phone = values.tel_1
    // console.log("valuesUser", values)
    console.log('userValues', valuesUser)
    const validateU = await validateUser(valuesUser, validate)
    console.log('validateU', validateU)
    if (validateU.fails()) {
      // reject({ status: false, error: validateU.messages() })
      return response.status(400).json(genericResponse.error(validateU.messages(), validateU.messages()[0].message))
    } 
    const user = new User()
    user.merge(valuesUser)
    let resUser = await user.save()
    if (resUser){
      const seller = new Seller()
      seller.merge(values)
      seller.user_id = user.id
      let res = await seller.save()

      if (res) {
        return response.json(genericResponse.success(seller, 'Se obtuvieron los datos correctamente'))
      } 
    }
    return response.status(400).json(genericResponse.error(null, 'Ocurrio un error'))
  }

  /**
   * Display a single seller.
   * GET sellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = params.id 
    const item = await Seller.query().with('user').where('id', id).first()
    
    return response.json(genericResponse.success(item, "Se obtuvo el usuario correctamente"))
  }

  /**
   * Update seller details.
   * PUT or PATCH sellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a seller with id.
   * DELETE sellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      let item = await Seller.find(params.id)
      item.alive = false
      let res = await item.save()
      if (res) {
        return response.json(genericResponse.success(null, 'Se ha eliminado con exito'))
      } else {
        return response.json(genericResponse.error(e, null))
      }
    } catch (e) {
      console.log(e)
      return response.json(genericResponse.error(e, 'No existe el vendedor!'))
    }
  }

  /**
   * Block seller.
   * PUT or PATCH sellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async block ({ params, request, response }) {
    let id = params.id 
    const item = await Seller.query().where('id', id).first()
    item.blocked = true

    let res = await item.save()
      if (res) {
        return response.json(genericResponse.success(null, 'Se ha bloqueado con exito'))
      } else {
        return response.json(genericResponse.error(e, null))
      } 
  }
}

async function validateUser(userValues, validate) {
  return new Promise(async (resolve, reject) => {
    const rules = {
      email: 'required|email|unique:users',
      password: 'required',
      fullname: 'required',
      username: 'required|unique:users',
      phone: 'required|integer|unique:users'
    }
    const messages = {
      'fullname.required': 'Debes proporcionar un nombre completo.',
      'email.required': 'Debes proporcionar un correo electrónico.',
      'email.email': 'Debes proporcionar un correo electrónico válida.',
      'email.unique': 'Este correo electrónico ya está registrado.',
      'username.unique': 'Este username ya está registrado.',
      'password.required': 'Debes proporcionar una contraseña.',
      'permissions.required': 'Debes proporcionar al menos un permiso.',
      'phone.required': 'Debes proporcionar un telefono',
      'phone.integer': 'Debes proporcionar un telefono',
      'phone.unique': 'Este telefono ya está registrado.',
      'username.required': 'Debes proporcionar un nombre de usuario'
    }
    console.log('userValues', userValues)
    const validation = await validate(userValues, rules, messages)
  
    // console.log('validation', validation.toJSON())
    resolve(validation)
    
  })
}

module.exports = SellerController
