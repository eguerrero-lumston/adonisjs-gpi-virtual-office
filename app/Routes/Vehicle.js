'use strict'

const Route = use('Route')

module.exports = () => {
    Route.get('models', 'VehicleController.getModels')
    Route.get('brands', 'VehicleController.getBrands')
    Route.get('versions', 'VehicleController.getVersions')
    Route.get('descriptions', 'VehicleController.getDescriptions')
    Route.post('quotation', 'VehicleController.saveQuotation')
    Route.get('quote', 'VehicleController.getQuote')
  }
  