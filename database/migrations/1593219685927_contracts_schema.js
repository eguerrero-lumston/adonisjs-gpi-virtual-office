'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractsSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('name', 254).notNullable()
      table.string('url', 500).notNullable()
      table.integer('seller_id').unsigned().references('id').inTable('sellers')
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractsSchema
