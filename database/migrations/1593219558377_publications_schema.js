'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationsSchema extends Schema {
  up () {
    this.create('publications', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('publications')
  }
}

module.exports = PublicationsSchema
