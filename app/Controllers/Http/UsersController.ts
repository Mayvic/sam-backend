import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
    public async index({ auth }: HttpContextContract) {
        const user = auth.user!
        return user.serialize()
    }
}
