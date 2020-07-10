'use strict'
const genericResponse = use("App/Utils/GenericResponse")
const Seller = use('App/Models/Seller')

class UpdateSeller {
  get rules () {
    const id = this.ctx.params.id
    // |unique:users,email,id,${userId}
    return {
      email: `required|email|unique:sellers,email,id,${id}`,
      password: 'required',
      loteName: 'required',
      address: 'required',
      tel1: 'required|different:tel2|different:tel3',
      tel2: 'different:tel1|different:tel3',
      tel3: 'different:tel1|different:tel2',
      rfc: 'required',
      state: 'required',
      zipCode: 'required|integer'
    }
  }
  get messages () {
    return {
      'username.required': 'Debes proporcionar un nombre de usuario',
      'username.unique': 'Este nombre de usuario ya está registrado',
      'email.required': 'Debes proporcionar un correo electrónico.',
      'email.email': 'Debes proporcionar un correo electrónico válida.',
      'email.unique': 'Este correo electrónico ya está registrado.',
      'password.required': 'Debes proporcionar una contraseña.',
      'loteName.required': 'Debes proporcionar un nombre para el lote',
      'address.required': 'Debes proporcionar una direccion',
      'tel1.required': 'Debes proporcionar un telefono',
      'tel1.different': 'Debes proporcionar un telefono diferente',
      'tel2.different': 'Debes proporcionar un telefono diferente',
      'tel3.different': 'Debes proporcionar un telefono diferente',
      'rfc.required': 'Debes proporcionar un rfc',
      'state.required': 'Debes proporcionar un estado',
      'zipCode.required': 'Debes proporcionar un codigo postal',
      'zipCode.integer': 'Debes proporcionar un numero para el codigo postal'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
      zipCode: 'to_int'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response
                .status(400)
                .json(genericResponse.error(errorMessages, errorMessages[0].message));
	}
}

module.exports = UpdateSeller
