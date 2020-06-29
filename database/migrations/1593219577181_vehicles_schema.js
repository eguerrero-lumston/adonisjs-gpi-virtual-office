'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehiclesSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.string('brand', 254).notNullable()
      table.string('model', 254).notNullable()
      table.bigInteger('mileage').notNullable().defaultTo(0)
      table.integer('fuel_id').unsigned().references('id').inTable('fuels') //pending
      table.integer('year').notNullable()
      table.integer('owners').notNullable().defaultTo(0)
      table.integer('condition_id').unsigned().references('id').inTable('conditions') //pending
      table.string('color', 254).notNullable()
      table.bigInteger('price').notNullable().defaultTo(0)
      // 
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehiclesSchema
