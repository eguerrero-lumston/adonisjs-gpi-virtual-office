'use strict'

const genericResponse = use("App/Utils/GenericResponse")

class StoreVehicle {
  get rules () {
    return {
      'brand': 'required',
      'model': 'required',
      'mileage': 'required|integer',
      'fuel': 'required',
      'year': 'required|integer',
      'owners': 'required',
      'condition': 'required',
      'color': 'required',
      'price': 'required|integer',
      'motor': 'required',
      'motorDescription': 'required',
      'cylinders': 'required|integer',
      'performanceCity': 'required',
      'performanceRoad': 'required',
      'tankCapacity': 'required',
      'passengers': 'required|integer',
      'transmission': 'required',
      'airConditioning': 'required',
      'abs': 'required',
      'brakeAssistance': 'required',
      'cdPlayer': 'required',
      'usbStereo': 'required',
      'electricalInsurance': 'required',
      'airbags': 'required',
      'leatherSeats': 'required',
      'electricWindows': 'required',
      'automaticTrunk': 'required',
      'cupHolder': 'required'
    }
  }
  get messages () {
    return {
      'brand.required': 'Debes proporcionar una marca',
      'model.required': 'Debes proporcionar un modelo',
      'mileage.required': 'Debes proporcionar un kilometraje',
      'mileage.integer': 'Debes proporcionar un numero',
      'fuel.required': 'Debes proporcionar un tipo de combustible',
      'year.required': 'Debes proporcionar un año',
      'year.integer': 'Debes proporcionar un numero',
      'owners.required': 'Debes proporcionar un numero de propietarios',
      'condition.required': 'Debes seleccionar una condicion',
      'color.required': 'Debes proporcionar un color',
      'price.required': 'Debes proporcionar un precio',
      'price.integer': 'Debes proporcionar un numero',
      'motor.required': 'Debes proporcionar un tipo de motor',
      'motorDescription.required': 'Debes proporcionar una descripcion de motor',
      'cylinders.required': 'Debes proporcionar el numero de cilindros',
      'cylinders.integer': 'Debes proporcionar un numero de cilindros',
      'performanceCity.required': 'Debes proporcionar una descripcion en la ciudad',
      'performanceRoad.required': 'Debes proporcionar una descripcion en la carretera',
      'tankCapacity.required': 'Debes proporcionar la capacidad de tanque',
      'passengers.required': 'Debes proporcionar el numero de pasajeros',
      'passengers.integer': 'Debes proporcionar el numero de pasajeros',
      'transmission.required': 'Debes proporcionar un tipo de transmission',
      'airConditioning.required': 'Debes confirmar si tiene airecondicionado',
      'abs.required': 'Debes confirmar si tiene frenos abs',
      'brakeAssistance.required': 'Debes confirmar si tiene asistene de frenos',
      'cdPlayer.required': 'Debes confirmar si tiene reproductor de cd',
      'usbStereo.required': 'Debes confirmar si tiene estereo usb',
      'electricalInsurance.required': 'Debes confirmar si tiene seguros electricos',
      'airbags.required': 'Debes confirmar si tiene bolsas de aire',
      'leatherSeats.required': 'Debes confirmar si tiene asientos de cuero',
      'electricWindows.required': 'Debes confirmar si tiene ventanas electricas',
      'automaticTrunk.required': 'Debes confirmar si tiene cajuela electrica',
      'cupHolder.required': 'Debes confirmar si tiene portavasos'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
      phone: 'to_int'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response
                .status(400)
                .json(genericResponse.error(errorMessages, errorMessages[0].message));
	}
}

module.exports = StoreVehicle
