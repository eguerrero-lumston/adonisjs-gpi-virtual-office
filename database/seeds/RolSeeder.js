'use strict'

/*
|--------------------------------------------------------------------------
| RolSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RolSeeder {
  async run () {
    const rol1 = await Factory
          .get('rols')
          .table('rols')
          .create({ name: 'Admin' })

    const rol2 = await Factory
          .get('rols')
          .table('rols')
          .create({ name : 'Office' })

    // console.log(rolsArray)
  }
}

module.exports = RolSeeder
