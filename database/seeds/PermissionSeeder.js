'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PermissionSeeder {
  async run () {
    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Dashboard', value: 1 })

    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Venta de seguros', value: 2 })

    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Vendedores', value: 4 })

    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Leads', value: 8 })

    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Inventario', value: 16 })

    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Usuarios', value: 32 })

    await Factory
          .model('App/Models/Permission')
          .create({ name: 'Planes', value: 64 })

  }
}

module.exports = PermissionSeeder
