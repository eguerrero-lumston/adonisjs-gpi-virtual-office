'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeadsSchema extends Schema {
  up () {
    this.create('leads', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('fullname', 80).notNullable()
      table.string('phone', 20).nullable()
      table.string('email', 100).notNullable().unique()
      table.string('gender').notNullable()
      table.timestamp('birthday').nullable()
      table.integer('zip_code').nullable()
      table.enu('person', ['física', 'moral'])
      table.enu('origin', ['admin', 'web'])
      table.timestamps()
    })
  }

  down () {
    this.drop('leads')
  }
}

module.exports = LeadsSchema
