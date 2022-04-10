import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class LoginController {
  public async signIn({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(email, password)
      const user = await User.findBy('email', email)
      return {
        user: {
          token,
          type: user!.type,
        },
      }
    } catch {
      return response.badRequest({ error: 'Invalid credentials' })
    }
  }

  public async signOut({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { revoked: true }
  }
}
