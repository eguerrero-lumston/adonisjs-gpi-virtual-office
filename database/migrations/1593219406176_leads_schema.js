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
      table.enu('gender', ['female', 'male']).notNullable()
      table.date('birthday').nullable()
      table.integer('zip_code', 6).nullable()
      table.enu('person', ['física', 'moral']).defaultTo('física')
      table.enu('origin', ['admin', 'web', 'app']).defaultTo('web')
      table.timestamps()
    })
  }

  down () {
    this.drop('leads')
  }
}

module.exports = LeadsSchema
