'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.group(() => {
    Route.resource('users', 'UserController')
        .middleware(new Map([
            [[ 'show', 'create', 'index', 'update', 'destroy'], ['auth']]
        ]))
        .validator(new Map([
            [['users.store'], ['StoreUser']],
            [['users.update'], ['UpdateUser']]
        ]))
        .apiOnly()
    Route.post('users/login', 'UserController.login')

    Route.resource('leads', 'LeadController')
        .middleware([ 'auth', 'isAdmin' ])
        .validator(new Map([
            [['leads.store'], ['StoreLead']],
            [['leads.update'], ['UpdateLead']]
        ]))
        .apiOnly()

    Route.resource('vehicles', 'VehicleController')
        .middleware([ 'auth' ])
        .validator(new Map([
            [['vehicles.store'], ['StoreVehicle']],
            [['vehicles.update'], ['UpdateVehicle']]
        ]))
        .apiOnly()

    



}).prefix('api/v1')

Route.group(() => {
    Route.get('models', 'VehicleController.getModels')
    Route.get('brands', 'VehicleController.getBrands')
    Route.get('versions', 'VehicleController.getVersions')
    Route.get('descriptions', 'VehicleController.getDescriptions')
    Route.post('quotation', 'VehicleController.saveQuotation')
    Route.get('quote', 'VehicleController.getQuote')
})
    .prefix('api/v1')
    .middleware([ 'auth' ])
// .middleware(new Map([
//     [[ 'show', 'store', 'index', 'update', 'destroy'], ['auth']]
// ]))