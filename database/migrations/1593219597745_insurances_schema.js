'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InsurancesSchema extends Schema {
  up () {
    this.create('insurances', (table) => {
      table.increments()
      table.boolean('alive').notNullable().defaultTo(true)
      // user
      table.string('origin', 10).notNullable()
      table.integer('lead_id').unsigned().references('id').inTable('leads')
      table.boolean('is_credi_vehicle').notNullable().defaultTo(false)

      // vehicle
      table.string('brand', 254).notNullable()
      table.string('model', 254).notNullable()
      table.integer('year').nullable()
      // table.integer('transmission_id').unsigned().references('id').inTable('transmissions') //pending
      table.enu('transmission', ['automatica', 'manual?'])
      table.integer('passengers').notNullable().defaultTo(0)
      table.string('description', 500).notNullable().defaultTo('')

      // insurance
      table.integer('budget').notNullable().defaultTo(0)
      table.enu('payment', ['contado', 'credito'])
      table.enu('hedge', ['amplia', 'limitada'])
      table.boolean('deductible').notNullable().defaultTo(false)

      // hedge
      table.boolean('extension').notNullable().defaultTo(false)
      table.boolean('partial_theft').notNullable().defaultTo(false)
      table.boolean('0_deductible_collision').notNullable().defaultTo(false)
      table.boolean('cade').notNullable().defaultTo(false)
      table.boolean('damage_without_liability').notNullable().defaultTo(false)
      table.boolean('self_agency').notNullable().defaultTo(false)
      table.boolean('substitute_car').notNullable().defaultTo(false)

      table.string('clave', 254).nullable().defaultTo('')
      table.timestamps()
    })
  }

  down () {
    this.drop('insurances')
  }
}

module.exports = InsurancesSchema

// status	1
// data	[ {…} ]
// 0	Object { cia: "qualitas", duty: "600", iva: "6857.16", … }
// cia	"qualitas"
// duty	"600"
// iva	"6857.16"
// net_price	"39715.46"
// price_total	"49714.41"
// first_payment	"4780.84"
// payments	"4084.87"
// recharges	"2541.79"