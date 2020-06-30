'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterestsSchema extends Schema {
  up () {
    this.create('lead_vehicle', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.integer('lead_id').unsigned().references('id').inTable('leads')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles')
      table.integer('status').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('lead_vehicle')
  }
}

module.exports = InterestsSchema
