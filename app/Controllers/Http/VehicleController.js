'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Vehicle = use('App/Models/Vehicle')
const Drive = use('Drive')
const Env = use('Env')
const _ = use('lodash')
const genericResponse = use("App/Utils/GenericResponse")
const request = use('request')
const convert = use('xml-js')

/**
 * Resourceful controller for interacting with vehicles
 */
class VehicleController {

  async uploadPhoto({ request, response, auth }) {
    // upload rules
    const validationOptions = {
      types: ['jpeg', 'jpg', 'png'],
      size: '5mb'
    }

    request.multipart.file('avatar', validationOptions, async file => {
      // set file size from stream byteCount, so adonis can validate file size
      file.size = file.stream.byteCount

      // run validation rules
      await file.runValidations()

      // catches validation errors, if any and then throw exception
      const error = file.error()
      if (error.message) {
        // throw new Error(error.message)
        response
          .status(400)
          .json(genericResponse.error(error, error.message))
      }

      // upload file to s3
      await Drive.put(`teste/${file.clientName}`, file.stream, {
        ContentType: file.headers['content-type'],
        ACL: 'public-read'
      })
    })

    // You must call this to start processing uploaded file
    await request.multipart.process()

    return 'done'
  }
  /**
   * Show a list of all vehicles.
   * GET vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Create/save a new vehicle.
   * POST vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const attributs = ['alive', 'brand', 'model', 'mileage',
      'fuel', 'year', 'owners', 'condition', 'color',
      'price', 'motor', 'motorDescription',
      'cylinders', 'performanceCity', 'performanceRoad',
      'tankCapacity', 'passengers', 'transmission', 'airConditioning',
      'abs', 'brakeAssistance', 'cdPlayer', 'usbStereo', 'electricalInsurance',
      'airbags', 'leatherSeats', 'electricWindows', 'automaticTrunk', 'cupHolder']
    const oldvalues = request.only(attributs)
    var values = _.mapKeys(oldvalues, (value, key) => _.snakeCase(key));
    return response.json(values)
    const vehicle = await Vehicle.create(values)
    await vehicle.save()

    // console.log('values', values)

    return response.json(genericResponse.success(vehicle, "Se creo correctamente"))
  }

  /**
   * Display a single vehicle.
   * GET vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Update vehicle details.
   * PUT or PATCH vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a vehicle with id.
   * DELETE vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  async getModels({ request, response }) {
    var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ns="http://schemas.datacontract.org/2004/07/">
          <soapenv:Header/>
          <soapenv:Body>
              <tem:Consulta_Modelos>
                  <tem:Datos_Autenticacion>
                      <ns:Contrasena>${ Env.get('WS_BITUAJ_PASS')}</ns:Contrasena>
                      <ns:KeyCode>${ Env.get('WS_BITUAJ_KEY')}</ns:KeyCode>
                      <ns:Usuario>${ Env.get('WS_BITUAJ_USER')}</ns:Usuario>
                  </tem:Datos_Autenticacion>
                  <tem:Datos_Vehiculo>
                      <ns:Descripcion>?</ns:Descripcion>
                      <ns:MError>?</ns:MError>
                      <ns:Marca>?</ns:Marca>
                      <ns:Modelo>0</ns:Modelo>
                      <ns:Tipo_Vehiculo>Auto_Particulares</ns:Tipo_Vehiculo>
                      <ns:Version>?</ns:Version>
                  </tem:Datos_Vehiculo>
              </tem:Consulta_Modelos>
          </soapenv:Body>
          </soapenv:Envelope>`;
    let result = await getData(Env.get('WS_CATALAGOS_URL'), Env.get('WS_CATALAGOS_SOAP_GET_MODELS'), xml)
    if (result.status == 1) {
      if (result.response['s:Envelope']['s:Body']['Consulta_ModelosResponse']['Consulta_ModelosResult']['a:string'] != undefined) {
        var data = result.response['s:Envelope']['s:Body']['Consulta_ModelosResponse']['Consulta_ModelosResult']['a:string'],
          newData = []

        if (Array.isArray(data)) {
          data.forEach(element => {
            newData.push(element['_text']);
          });
        } else {
          newData.push(data['_text']);
        }

        return response.json(genericResponse.success(newData, "Se obtuvieron correctamente"));
      } else {
        return response.json(genericResponse.error(null, "Ocurrio un error"));
      }
    } else {
      return response.json(genericResponse.success(result, "datos en crudo"));
    }
  }

  async getBrands({ request, response }) {
    let { model } = request.only(['model'])
    var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ns="http://schemas.datacontract.org/2004/07/">
          <soapenv:Header/>
          <soapenv:Body>
          <tem:Consulta_Marcas>
              <tem:Datos_Autenticacion>
                  <ns:Contrasena>${Env.get('WS_BITUAJ_PASS')}</ns:Contrasena>
                  <ns:KeyCode>${Env.get('WS_BITUAJ_KEY')}</ns:KeyCode>
                  <ns:Usuario>${Env.get('WS_BITUAJ_USER')}</ns:Usuario>
              </tem:Datos_Autenticacion>
              <tem:Datos_Vehiculo>
                  <ns:Descripcion>?</ns:Descripcion>
                  <ns:MError>?</ns:MError>
                  <ns:Marca>?</ns:Marca>
                  <ns:Modelo>${ model }</ns:Modelo>
                  <ns:Tipo_Vehiculo>Auto_Particulares</ns:Tipo_Vehiculo>
                  <ns:Version>?</ns:Version>
              </tem:Datos_Vehiculo>
          </tem:Consulta_Marcas>
          </soapenv:Body>
      </soapenv:Envelope>`;

    let result = await getData(Env.get('WS_CATALAGOS_URL'), Env.get('WS_CATALAGOS_SOAP_GET_BRANDS'), xml)
    if (result.status == 1) {
      if (result.response['s:Envelope']['s:Body']['Consulta_MarcasResponse']['Consulta_MarcasResult']['a:string'] != undefined) {
        var data = result.response['s:Envelope']['s:Body']['Consulta_MarcasResponse']['Consulta_MarcasResult']['a:string'],
          newData = {
            brand: []
          };

        if (Array.isArray(data)) {
          data.forEach(element => {
            newData.brand.push(element['_text']);
          });
        } else {
          newData.brand.push(data['_text'])
        }

        response.json(genericResponse.success(newData, "Se obtuvieron correctamente"));
      } else {
        response.json(genericResponse.error(null, "Ocurrio un error"));
      }
    } else {
      response.json(genericResponse.success(result, "datos en crudo"))
    }
  }

  async getVersions({ request, response }) {
    var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ns="http://schemas.datacontract.org/2004/07/">
          <soapenv:Header/>
          <soapenv:Body>
          <tem:Consulta_Versiones>
              <tem:Datos_Autenticacion>
                  <ns:Contrasena>${Env.get('WS_BITUAJ_PASS')}</ns:Contrasena>
                  <ns:KeyCode>${Env.get('WS_BITUAJ_KEY')}</ns:KeyCode>
                  <ns:Usuario>${Env.get('WS_BITUAJ_USER')}</ns:Usuario>
              </tem:Datos_Autenticacion>
              <tem:Datos_Vehiculo>
                  <ns:Descripcion>?</ns:Descripcion>
                  <ns:MError>?</ns:MError>
                  <ns:Marca>${request.body.brand}</ns:Marca>
                  <ns:Modelo>${request.body.model}</ns:Modelo>
                  <ns:Tipo_Vehiculo>Auto_Particulares</ns:Tipo_Vehiculo>
                  <ns:Version>?</ns:Version>
              </tem:Datos_Vehiculo>
          </tem:Consulta_Versiones>
          </soapenv:Body>
      </soapenv:Envelope>`;

    let result = await getData(Env.get('WS_CATALAGOS_URL'), Env.get('WS_CATALAGOS_SOAP_GET_VERSIONS'), xml)
    //  (result) => {
    if (result.status == 1) {
      if (result.response['s:Envelope']['s:Body']['Consulta_VersionesResponse']['Consulta_VersionesResult']['a:string'] != undefined) {
        var data = result.response['s:Envelope']['s:Body']['Consulta_VersionesResponse']['Consulta_VersionesResult']['a:string'],
          newData = {
            version: []
          };

        if (Array.isArray(data)) {
          data.forEach(element => {
            newData.version.push(element['_text']);
          });
        } else {
          newData.version.push(data['_text'])
        }

        return response.json(genericResponse.success(newData, "Se obtuvieron correctamente"));
      } else {
        return response.json(genericResponse.error(null, "Ocurrio un error"))
      }
    } else {
      return response.json(genericResponse.success(result, "datos en crudo"))
    }
  }

  async getDescriptions({ request, response }) {
    var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ns="http://schemas.datacontract.org/2004/07/">
          <soapenv:Header/>
          <soapenv:Body>
          <tem:Consulta_Descripciones>
              <tem:Datos_Autenticacion>
                  <ns:Contrasena>${Env.get('WS_BITUAJ_PASS')}</ns:Contrasena>
                  <ns:KeyCode>${Env.get('WS_BITUAJ_KEY')}</ns:KeyCode>
                  <ns:Usuario>${Env.get('WS_BITUAJ_USER')}</ns:Usuario>
              </tem:Datos_Autenticacion>
              <tem:Datos_Vehiculo>
                  <ns:Descripcion>?</ns:Descripcion>
                  <ns:MError>?</ns:MError>
                  <ns:Marca>${request.body.brand}</ns:Marca>
                  <ns:Modelo>${request.body.model}</ns:Modelo>
                  <ns:Tipo_Vehiculo>Auto_Particulares</ns:Tipo_Vehiculo>
                  <ns:Version>${request.body.version}</ns:Version>
              </tem:Datos_Vehiculo>
          </tem:Consulta_Descripciones>
          </soapenv:Body>
      </soapenv:Envelope>`;

    let result = await getData(Env.get('WS_CATALAGOS_URL'), Env.get('WS_CATALAGOS_SOAP_GET_DESCRIPTIONS'), xml)
    //  (result) => {
    if (result.status == 1) {
      if (result.response['s:Envelope']['s:Body']['Consulta_DescripcionesResponse']['Consulta_DescripcionesResult']['a:string'] != undefined) {
        var data = result.response['s:Envelope']['s:Body']['Consulta_DescripcionesResponse']['Consulta_DescripcionesResult']['a:string'],
          newData = {
            description: []
          };

        if (Array.isArray(data)) {
          data.forEach(element => {
            newData.description.push(element['_text']);
          });
        } else
          newData.description.push(data['_text']);

        return response.json(genericResponse.success(newData, "Se obtuvieron correctamente"));
      } else
        return response.json(genericResponse.error(null, "Ocurrio un error"));
    } else
      return response.json(genericResponse.success(result, "datos en crudo"));
  }

  async saveQuotation({ request, response }) {
    var quoteInsurance = new QuoteInsuranceModel,
      data = request.body.data,
      xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ns="http://schemas.datacontract.org/2004/07/">
              <soapenv:Header/>
              <soapenv:Body>
              <tem:Consulta_Clave_Vehiculo>
                  <tem:Datos_Autenticacion>
                      <ns:Contrasena>${Env.get('WS_BITUAJ_PASS')}</ns:Contrasena>
                      <ns:KeyCode>${Env.get('WS_BITUAJ_KEY')}</ns:KeyCode>
                      <ns:Usuario>${Env.get('WS_BITUAJ_USER')}</ns:Usuario>
                  </tem:Datos_Autenticacion>
                  <tem:Datos_Vehiculo>
                      <ns:Descripcion>${data.vehicle_description}</ns:Descripcion>
                      <ns:MError>?</ns:MError>
                      <ns:Marca>${data.vehicle_brand}</ns:Marca>
                      <ns:Modelo>${data.vehicle_model}</ns:Modelo>
                      <ns:Tipo_Vehiculo>Auto_Particulares</ns:Tipo_Vehiculo>
                      <ns:Version>${data.vehicle_version}</ns:Version>
                  </tem:Datos_Vehiculo>
              </tem:Consulta_Clave_Vehiculo>
              </soapenv:Body>
          </soapenv:Envelope>`;

    let result = await getData(Env.get('WS_CATALAGOS_URL'), Env.get('WS_CATALAGOS_SOAP_GET_VEHICLE_KEY'), xml)
    if (result.status == 1) {
      if (result.response['s:Envelope']['s:Body']['Consulta_Clave_VehiculoResponse']['Consulta_Clave_VehiculoResult']['_text'] != undefined) {
        var vehicleKey = result.response['s:Envelope']['s:Body']['Consulta_Clave_VehiculoResponse']['Consulta_Clave_VehiculoResult']['_text'];

        console.log(vehicleKey)

        data.vehicle_key = vehicleKey;
        quoteInsurance.create(data).then((result) => {
          result.data = {
            vehicle_key: vehicleKey
          };

          return response.json(genericResponse.success(result, "datos en crudo"));
        }, (err) => {
          return response.json(err);
        });
      } else {
        return response.json(genericResponse.error(null, "Ocurrio un error"))
      }
    } else {
      return response.json(genericResponse.success(result, "datos en crudo"))
    }
  }

  async getQuote({ request, response }) {
    var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ns="http://schemas.datacontract.org/2004/07/">
          <soapenv:Header/>
          <soapenv:Body>
          <tem:Cotizar>
              <tem:oDatos_Basicos>
                  <ns:CP>${request.body.postcode}</ns:CP>
                  <ns:Cia>${request.body.cia}</ns:Cia>
                  <ns:Clave_Auto>${request.body.vehicle_key}</ns:Clave_Auto>
                  <ns:Deducibles>${request.body.deductible}</ns:Deducibles>
                  <ns:Descuento>0</ns:Descuento>
                  <ns:Edad>${request.body.age}</ns:Edad>
                  
                  <ns:FPago>Mensual</ns:FPago>
                  <ns:Fecha_Factura>${moment().format()}</ns:Fecha_Factura>
                  <ns:Fecha_Fin>${moment().add(1, 'years').format()}</ns:Fecha_Fin>
                  <ns:Fecha_Inicio>${moment().format()}</ns:Fecha_Inicio>
                  <ns:MError>?</ns:MError>
                  <ns:Modelo>${request.body.model}</ns:Modelo>
                  
                  <ns:Plan>${request.body.coverage}</ns:Plan>
                  <ns:Sexo>${request.body.gender}</ns:Sexo>
                  <ns:Tipo_Vehiculo>Auto_Particulares</ns:Tipo_Vehiculo>
                  <ns:Valor_Factura>0</ns:Valor_Factura>
              </tem:oDatos_Basicos>
              <tem:oDatos_Autent>
                  <ns:Contrasena>${Env.get('WS_BITUAJ_PASS')}</ns:Contrasena>
                  <ns:KeyCode>${Env.get('WS_BITUAJ_KEY')}</ns:KeyCode>
                  <ns:Usuario>${Env.get('WS_BITUAJ_USER')}</ns:Usuario>
              </tem:oDatos_Autent>
          </tem:Cotizar>
          </soapenv:Body>
      </soapenv:Envelope>`;

    let result = await getData(Env.get('WS_QUOTATIONS_URL'), Env.get('WS_QUOTATIONS_SOAP_GET_QUOTE'), xml)
    //  (result) => {
    if (result.status == 1) {
      if (result.response['s:Envelope']['s:Body']['CotizarResponse']['CotizarResult'] != undefined) {
        var data = result.response['s:Envelope']['s:Body']['CotizarResponse']['CotizarResult'],
          newData = [],
          tempObj = {};


        if (!data['a:MError']['_text']) {
          tempObj.cia = data['a:Cia']['_text'];
          tempObj.duty = data['a:Derechos']['_text'];
          tempObj.iva = data['a:Iva']['_text'];
          tempObj.net_price = data['a:PNeta']['_text'];
          tempObj.price_total = data['a:PTotal']['_text'];
          tempObj.first_payment = data['a:Rec1']['_text'];
          tempObj.payments = data['a:Rec2']['_text'];
          tempObj.recharges = data['a:Recargos']['_text'];

          newData.push(tempObj);
        }

        return response.json(genericResponse.success(newData, "Se obtuvieron correctamente"));
      } else {
        return response.json(genericResponse.error(null, "Ocurrio un error"))
      }
    } else {
      return response.json(genericResponse.success(result, "datos en crudo"))
    }
  }
}

async function getData(url, action, xml) {
  return new Promise((resolve, reject) => {
    request.post({
      url: url,
      headers: {
        'content-type': 'text/xml;charset=UTF-8',
        'SOAPAction': action
      },
      body: xml,
      timeout: 1000 * 60 * 10
    }, (err, result, body) => {
      if (err) {
        console.log(err);
        reject(genericResponse.error(null, "Ocurrio un error"))
      } else {
        var xmlParsed = convert.xml2js(body, { compact: true, spaces: 4 })
        resolve({ status: 1, response: xmlParsed })
      }
    })
  })
}

module.exports = VehicleController
