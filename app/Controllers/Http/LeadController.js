'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use('Validator')
const Lead = use('App/Models/Lead')
const genericResponse = use("App/Utils/GenericResponse")
const _ = use('lodash')

/**
 * Resourceful controller for interacting with leads
 */
class LeadController {
  /**
   * Show a list of all leads.
   * GET leads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const page = request.only(['page']) || 1
    const limit = request.only(['limit']) || 20

    const leads = await Lead
                        .query()
                        .where('alive', 1)
                        .with('vehicles')
                        .paginate(page, limit)
    
    response.status(200).send(genericResponse.success(leads, "Se obtuvieron los datos correctamente"))
  }

  /**
   * Create/save a new lead.
   * POST leads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const oldvalues = request.only(['fullname','phone','email','gender','birthday','zipCode','person','origin'])
    var values = _.mapKeys(oldvalues, (value, key) => _.snakeCase(key));
    const { vehicles } = request.only(['vehicles']) 
    const lead = await Lead.create(values)
    if (vehicles != null && vehicles.length) {
      for (const element of vehicles) {
        const lucidLeadV = new LeadVehicle()
        lucidLeadV.vehicle_id = element
        lucidLeadV.lead_id = lead.id
        lead.vehicles().save(lucidLeadV)
      }
    }
    
    await lead.save()
    let vehiclesColl = await lead.vehicles().fetch()
    lead.vehicles = vehiclesColl.toJSON()
    return response.json(genericResponse.success(lead, "Se creo correctamente"))
  }

  /**
   * Display a single lead.
   * GET leads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = params.id 
    const lead = await Lead.query().with('vehicles').where('id', id).first()
    
    return response.json(genericResponse.success(lead , "Se obtuvo el lead correctamente"))
  }

  /**
   * Update lead details.
   * PUT or PATCH leads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const oldvalues = request.only(['fullname','phone','email','gender','birthday','zipCode','person','origin'])
    var values = _.mapKeys(oldvalues, (value, key) => _.snakeCase(key));
    console.log('newObj: ', values);
    // values.zip_code = values.zipCode
    // delete values.zipCode
    let { vehicles } = request.only('vehicles')
    let id = params.id
    var lead = await Lead.query().where('id', id).first()
    
    if (vehicles != null && vehicles.length) {
      await lead.vehicles().pivotQuery().whereNotIn('vehicle_id', vehicles ).delete()
      for (const element of vehicles) {
        await LeadVehicle.findOrCreate(
          { vehicle_id: element, lead_id: lead.id },
          { vehicle_id: element, lead_id: lead.id }
        )
      }
    }
    lead.merge(values)
    await lead.save()
    let vehiclesColl = await lead.vehicles().fetch()
    lead.vehicles = vehiclesColl.toJSON()
    return response.json(genericResponse.success(lead, "Se actualizo el usuario correctamente"))
  }

  /**
   * Delete a lead with id.
   * DELETE leads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      let lead = await Lead.find(params.id)
      lead.delete()

      return response.json(genericResponse.success(null, 'Se ha eliminado con exito'))
    } catch (e) {
      console.log(e)
      return response.json(genericResponse.error(e, 'No existe el lead!'))
    }
  }
}

module.exports = LeadController
