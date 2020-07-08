'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationsSchema extends Schema {
  up () {
    this.create('publications', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('description', 800).notNullable()
      table.integer('status').notNullable().defaultTo(0)
      table.boolean('published').notNullable().defaultTo(false)
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles')
      table.timestamp('published_at')
      table.timestamp('expired_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('publications')
  }
}

module.exports = PublicationsSchema
