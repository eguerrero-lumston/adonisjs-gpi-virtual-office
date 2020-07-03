'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Publication extends Model {
    vehicle() {
        return this.hasMany('App/Models/Lead')
    }
}

module.exports = Publication
