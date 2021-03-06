'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolUserSchema extends Schema {
  up () {
    this.create('rol_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('set null')
      table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('set null')
      table.timestamps()
    })
  }

  down () {
    this.drop('rol_users')
  }
}

module.exports = RolUserSchema
