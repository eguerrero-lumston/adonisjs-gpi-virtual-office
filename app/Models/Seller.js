'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Seller extends Model {
    static get Serializer () {
        return use('App/Models/Serializers/JsonSerializer')
    }
    contracts() {
        return this.hasMany('App/Models/Contract')
    }

    publications() {
        return this.hasMany('App/Models/Publication')
    }
}

module.exports = Seller
