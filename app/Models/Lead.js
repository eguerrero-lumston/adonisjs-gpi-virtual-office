'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lead extends Model {
    static get Serializer () {
        return use('App/Models/Serializers/JsonSerializer')
    }
    vehicles() {
        return this.belongsToMany('App/Models/Vehicle')
    }
}

module.exports = Lead
