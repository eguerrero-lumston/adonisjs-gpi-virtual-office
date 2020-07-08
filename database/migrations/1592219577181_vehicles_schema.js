'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehiclesSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('brand', 254).notNullable()
      table.string('model', 254).notNullable()
      table.bigInteger('mileage').notNullable().defaultTo(0)
      table.enu('origin', ['gpi', 'lotero']).defaultTo('gpi')
      // table.integer('fuel_id').unsigned().references('id').inTable('fuels') //pending
      table.enu('fuel', ['gasolina', 'electrico'])

      table.integer('year').nullable()
      table.integer('owners').notNullable().defaultTo(0)
      // table.integer('condition_id').unsigned().references('id').inTable('conditions') //pending
      table.enu('condition ', ['seminuevo', 'usado'])
      table.string('color', 254).notNullable()
      table.bigInteger('price').notNullable().defaultTo(0)

      // table.integer('motor_id').unsigned().references('id').inTable('motors') //pending
      table.enu('motor', ['AA', 'electrico'])
      table.string('motor_description', 500).notNullable().defaultTo('')
      table.integer('cylinders').notNullable().defaultTo(0)

      // table.integer('performance_city_id').unsigned().references('id').inTable('performance_city') //pending
      table.enu('performance_city', ['20 kmpl', '30kmpl'])
      // table.integer('performance_road_id').unsigned().references('id').inTable('performance_road') //pending
      table.enu('performance_road', ['20 kmpl', '30kmpl'])
      table.integer('tank_capacity').notNullable().defaultTo(0)
      table.integer('passengers').notNullable().defaultTo(0)
      // table.integer('transmission_id').unsigned().references('id').inTable('transmissions') //pending
      table.enu('transmission', ['manual', 'automática'])
      // equipment
      table.boolean('air_conditioning').notNullable().defaultTo(false)
      table.boolean('abs').notNullable().defaultTo(false)
      table.boolean('brake_assistance').notNullable().defaultTo(false)
      table.boolean('cd_player').notNullable().defaultTo(false)
      table.boolean('usb_stereo').notNullable().defaultTo(false)
      table.boolean('electrical_insurance').notNullable().defaultTo(false)
      table.boolean('airbags').notNullable().defaultTo(false)
      table.boolean('leather_seats').notNullable().defaultTo(false)
      table.boolean('electric_windows').notNullable().defaultTo(false)
      table.boolean('automatic_trunk').notNullable().defaultTo(false)
      table.boolean('cup_holder').notNullable().defaultTo(false)
      // air conditioning
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehiclesSchema
