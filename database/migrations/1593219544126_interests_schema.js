'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterestsSchema extends Schema {
  up () {
    this.create('interests', (table) => {
      table.increments()
      table.integer('lead_id').unsigned().references('id').inTable('leads').onDelete('set null')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('set null')
      table.timestamps()
    })
  }

  down () {
    this.drop('interests')
  }
}

module.exports = InterestsSchema
