'use strict'

const genericResponse = use("App/Utils/GenericResponse")

class JwtAuth {
  async handle ({ response, session, auth }, next) {
    // call next to advance the request
    try {
      const user = await auth.getUser()
      if (user.banned) {
        return response.status(403).json(genericResponse.error(null, 'Tienes prohibido este sitio.'))
      }
    } catch (error) {
      return response.status(401).json(genericResponse.error(null, 'Token faltante o inválido'))
    }
    await next()
  }
}

module.exports = JwtAuth
