'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlansSchema extends Schema {
  up () {
    this.create('plans', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('name', 80).notNullable()
      table.integer('diration').notNullable()
      table.integer('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('plans')
  }
}

module.exports = PlansSchema
