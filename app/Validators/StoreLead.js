'use strict'

const genericResponse = use("App/Utils/GenericResponse")

class StoreLead {
  get rules () {
    return {
      fullname: 'required',
      phone: 'required|integer',
      email: 'required|email|unique:leads',
      gender: 'required',
      birthday: 'required|date',
      zipCode: 'required|min:4',
      // person: 'required',
      origin: 'required'
    }
  }
  get messages () {
    return {
      'fullname.required': 'Debes proporcionar un nombre completo.',
      'phone.required': 'Debes proporcionar un telefono.',
      'phone.integer': 'Debes proporcionar un telefono',
      'email.required': 'Debes proporcionar un correo electrónico.',
      'email.email': 'Debes proporcionar un correo electrónico válido.',
      'email.unique': 'Este correo electrónico ya está registrado.',
      'gender.required': 'Debes proporcionar un genero.',
      'birthday.required': 'Debes proporcionar una fecha de cumpleaños.',
      'birthday.date': 'Debes proporcionar una fecha.',
      'zipCode.required': 'Debes proporcionar un codigo postal.',
      'zipCode.min': 'Debes proporcionar un codigo postal minimo de 4.',
      'person.required': 'Debes proporcionar un tipo de persona.',
      // 'origin.required': 'Debes proporcionar un origen.',
      'phone.integer': 'Debes proporcionar un telefono.'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
      phone: 'to_int',
      birthday: 'to_date'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response
                .status(400)
                .json(genericResponse.error(errorMessages, errorMessages[0].message));
	}
}

module.exports = StoreLead
