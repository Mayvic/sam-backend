import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor';

export default class ProfessorsController {
    public async index({ }: HttpContextContract) {
        const professors = await Professor.all();
        await Promise.all(professors.map((professor) => professor.load('user')))
        return professors.map((professor) => professor.serialize())
    }
}
