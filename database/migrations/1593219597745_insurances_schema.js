'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InsurancesSchema extends Schema {
  up () {
    this.create('insurances', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('insurances')
  }
}

module.exports = InsurancesSchema
