'use strict'

const genericResponse = use("App/Utils/GenericResponse")

class UpdateLead {
  get rules () {
    return {
      fullname: 'required',
      phone: 'required|integer',
      email: 'required|email',
      gender: 'required',
      birthday: 'required',
      zipCode: 'required',
      // person: 'required',
      origin: 'required'
    }
  }
  get messages () {
    return {
      'fullname.required': 'Debes proporcionar un nombre completo.',
      'phone.required': 'Debes proporcionar un telefono.',
      'email.required': 'Debes proporcionar un correo electrónico.',
      'email.email': 'Debes proporcionar un correo electrónico válido.',
      'gender.required': 'Debes proporcionar un genero.',
      'birthday.required': 'Debes proporcionar una fecha de cumpleaños.',
      'zipCode.required': 'Debes proporcionar un codigo postal.',
      'person.required': 'Debes proporcionar un tipo de persona.',
      'origin.required': 'Debes proporcionar un origen.',
      'phone.integer': 'Debes proporcionar un telefono.'
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

module.exports = UpdateLead
