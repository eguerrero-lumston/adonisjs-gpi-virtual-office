'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static get Serializer () {
    return use('App/Models/Serializers/JsonSerializer')
  }
  
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    // this.addHook('beforeSave', async (userInstance) => {
    //   if (userInstance.dirty.password) {
    //     userInstance.password = await Hash.make(userInstance.password)
    //   }
    // })

    this.addHook('beforeCreate', ['UserHook.setDefaults', 'UserHook.hashPassword'])
    this.addHook('afterCreate', ['UserHook.createProfile'])
  }
  static get hidden () {
    return ['password']
  }
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  /**
   * A relationship on permissions is required for auth to
   * work. Since features like `permissions` will be saved inside the
   * permissions table.
   *
   * @method permissions
   *
   * @return {Object}
   */
  permissions () {
    return this.belongsToMany('App/Models/Permission')
      .pivotModel('App/Models/PermissionUser')
  }

  rol () {
    return this.hasOne('App/Models/Rol')
  }
  
  profile () {
    return this.hasOne('App/Models/Profile')
  }
  
  logs () {
    return this.hasMany('App/Models/Log')
  }

  // roles
  static get roles () {
    return ['superadmin', 'admin', 'manager', 'moderator', 'member']
  }

  // hide fields
  static get hidden () {
    return ['password', 'reset_token', 'confirmation_token']
  }
}

module.exports = User
