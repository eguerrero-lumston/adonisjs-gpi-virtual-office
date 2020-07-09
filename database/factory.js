'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User',  (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    fullname: faker.first() + ' ' + faker.last(),
    phone: faker.phone(),
    rol_id: data.rol
  }
})

Factory.blueprint('App/Models/Rol', (faker, i, data) =>  {
    return {
        name: data.name
    }
})

Factory.blueprint('App/Models/Permission', (faker, i, data) =>  {
  return {
      name: data.name,
      value: data.value
  }
})