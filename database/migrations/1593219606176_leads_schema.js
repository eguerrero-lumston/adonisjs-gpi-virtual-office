'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeadsSchema extends Schema {
  up () {
    this.create('leads', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('leads')
  }
}

module.exports = LeadsSchema
