'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    const rol1 = await Database.table('rols').first()
    // console.log('rol1', rol1)
    const usersArray = await Factory
      .model('App/Models/User')
      .createMany(5, { rol: rol1.id })
    // console.log(usersArray)
  }
}

module.exports = UserSeeder
