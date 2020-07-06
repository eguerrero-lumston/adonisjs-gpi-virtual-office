'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesSchema extends Schema {
  up () {
    this.create('rols', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('name', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('rols')
  }
}

module.exports = RolesSchema
