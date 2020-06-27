'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesSchema extends Schema {
  up () {
    this.createIfNotExists('roles', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 254).notNullable().unique()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RolesSchema
