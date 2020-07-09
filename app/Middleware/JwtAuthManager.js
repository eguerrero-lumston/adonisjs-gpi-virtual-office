'use strict'
const genericResponse = use("App/Utils/GenericResponse")

class JwtAuthManager {
  async handle ({ response, session, auth }, next) {
    // call next to advance the request
    try {
      const user = await auth.getUser()
      if (user.banned) {
        return response.status(403).json(genericResponse.error(null, 'Tienes prohibido este sitio.'))
      }
      
      if (user.confirmation_token !== null) {
        return response.status(403).json(genericResponse.error(null, 'Debe verificar su cuenta antes de acceder a este recurso.'))
      }
      if (user.role !== 'manager' && user.role !== 'admin' && user.role !== 'superadmin') {
        return response.status(403).json(genericResponse.error(null, 'No tienes permiso para acceder a este recurso'))
      }
    } catch (error) {
      return response.status(401).json(genericResponse.error(null, 'Token faltante o inválido'))
    }
    await next()
  }
}

module.exports = JwtAuthManager
