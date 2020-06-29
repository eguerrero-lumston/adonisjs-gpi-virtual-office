'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationsSchema extends Schema {
  up () {
    this.createIfNotExists('publications', (table) => {
      table.increments()
      table.string('description', 800).notNullable()
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('set null')
      table.timestamps()
    })
  }

  down () {
    this.drop('publications')
  }
}

module.exports = PublicationsSchema
