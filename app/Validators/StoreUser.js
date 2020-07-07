'use strict'

const genericResponse = use("App/Utils/GenericResponse")

class StoreUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      fullname: 'required',
      permissions: 'required',
      username: 'required|unique:users',
      phone: 'required|integer|unique:users'
    }
  }
  get messages () {
    return {
      'fullname.required': 'Debes proporcionar un nombre completo.',
      'email.required': 'Debes proporcionar un correo electrónico.',
      'email.email': 'Debes proporcionar un correo electrónico válida.',
      'email.unique': 'Este correo electrónico ya está registrado.',
      'username.unique': 'Este username ya está registrado.',
      'password.required': 'Debes proporcionar una contraseña.',
      'permissions.required': 'Debes proporcionar al menos un permiso.',
      'phone.required': 'Debes proporcionar un telefono',
      'phone.integer': 'Debes proporcionar un telefono',
      'phone.unique': 'Este telefono ya está registrado.',
      'username.required': 'Debes proporcionar un nombre de usuario'
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

module.exports = StoreUser
