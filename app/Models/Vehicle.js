'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vehicle extends Model {
    interested() {
        return this.belongsToMany('App/Models/Lead')
    }

    publication() {
        return this.hasOne('App/Models/Publication')
    }
}

module.exports = Vehicle
