'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('uid').notNullable()
      table.boolean('alive').notNullable().defaultTo(true)
      table.string('fullname', 80).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('phone', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('rol_id').unsigned().references('id').inTable('rols')
      table.string('type', 60).notNullable().defaultTo('office')
      
      table.string('role')
      table.string('provider').notNullable()
      table.boolean('verified').defaultTo(false)
      table.string('confirmation_token')
      table.string('reset_token')
      table.boolean('banned')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
