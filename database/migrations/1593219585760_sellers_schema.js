'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellersSchema extends Schema {
  up () {
    this.create('sellers', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('lote_name', 80).notNullable()
      table.enu('status', [0, 1, 2, 3]).notNullable().defaultTo(0) 
      // 0 pendiente, 1 aprobado, 2 aceptado, 3 bloqueado
      table.string('address', 200).notNullable()
      table.bigInteger('tel_1').nullable()
      table.bigInteger('tel_2').nullable()
      table.bigInteger('tel_3').nullable()
      table.string('email', 100).notNullable().unique()
      table.string('rfc', 20).notNullable()
      table.string('state', 50).notNullable()
      table.integer('zip_code').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('sellers')
  }
}

module.exports = SellersSchema
