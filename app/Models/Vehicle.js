'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vehicle extends Model {
    static get Serializer () {
        return use('App/Models/Serializers/JsonSerializer')
    }
    interested() {
        return this.belongsToMany('App/Models/Lead')
    }

    publication() {
        return this.hasOne('App/Models/Publication')
    }
}

module.exports = Vehicle
