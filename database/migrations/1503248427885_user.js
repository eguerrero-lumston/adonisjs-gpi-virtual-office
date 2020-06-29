'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.createIfNotExists('users', (table) => {
      table.increments()
      table.string('fullname', 80).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('phone', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
