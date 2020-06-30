'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellersSchema extends Schema {
  up () {
    this.create('sellers', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.boolean('blocked').notNullable().defaultTo(false)
      table.string('lote_name', 80).notNullable()
      table.string('address', 200).notNullable()
      table.bigInteger('tel1').nullable()
      table.bigInteger('tel2').nullable()
      table.bigInteger('tel3').nullable()
      table.string('email', 100).notNullable().unique()
      table.string('rfc', 20).notNullable()
      // table.integer('state_id').unsigned().references('id').inTable('states') //pending
      table.string('state', 50).notNullable()
      // 
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
