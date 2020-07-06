'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionUserSchema extends Schema {
  up () {
    this.create('permission_users', (table) => {
      table.increments()
      table.integer('permission_id').unsigned().references('id').inTable('permissions')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('permission_users')
  }
}

module.exports = PermissionUserSchema