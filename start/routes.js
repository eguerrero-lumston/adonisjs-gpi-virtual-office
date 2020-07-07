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
        .middleware(new Map([
            [[ 'show', 'store', 'index', 'update', 'destroy'], ['auth']]
        ]))
        .validator(new Map([
            [['leads.store'], ['StoreLead']],
            [['leads.update'], ['UpdateLead']]
        ]))
        .apiOnly()
}).prefix('api/v1')


