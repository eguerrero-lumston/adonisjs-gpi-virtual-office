'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehicleImageSchema extends Schema {
  up () {
    this.create('vehicle_images', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('url', 254).notNullable()
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles')
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicle_images')
  }
}

module.exports = VehicleImageSchema
