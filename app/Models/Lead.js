'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lead extends Model {
    vehicles() {
        return this.belongsToMany('App/Models/Vehicle')
    }
}

module.exports = Lead
