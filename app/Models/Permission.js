'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    static get Serializer () {
        return use('App/Models/Serializers/JsonSerializer')
    }
    
    users () {
        return this.belongsToMany('App/Models/User')
    }
}

module.exports = Permission
