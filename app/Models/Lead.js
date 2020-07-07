'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require("moment");

class Lead extends Model {
    static get Serializer () {
        return use('App/Models/Serializers/JsonSerializer')
    }
    
    static get dates() {
        return super.dates.concat(["birthday"]);
    }
    
    static castDates(field, value) {
        if (field == "birthday"){
            return value ? value.format("DD/MM/YYYY") : value
        } else {
            return value ? value.format("DD/MM/YYYY hh:mm a") : value
        }
        // else used for created_at / updated_at
    }

    static formatDates(field, value) {
        if (field == "birthday") {
          // format only certain fields
          return moment(value, "DD/MM/YYYY").format("YYYY-MM-DD")
        }
    
        return super.formatDates(field, value);
    }
    
    vehicles() {
        return this.belongsToMany('App/Models/Vehicle')
                .pivotModel('App/Models/LeadVehicle')
    }
}

module.exports = Lead
