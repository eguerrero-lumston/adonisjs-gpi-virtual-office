'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('fullname', 80).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('phone', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('rol_id').unsigned().references('id').inTable('rols')
      table.string('type', 60).notNullable().defaultTo('office')
      // table.string('permissions', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
