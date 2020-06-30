'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionsSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('name', 80).notNullable()
      table.integer('value').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionsSchema
