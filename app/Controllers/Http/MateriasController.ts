import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Avaliacao from 'App/Models/Avaliacao'

export default class MateriasController {
    public async index({ auth }: HttpContextContract) {
        const user = auth.user!
        const aluno = await Aluno.findByOrFail('user_id', user.id)
        await aluno.load('materias')
        const avaliacoes = await Avaliacao.all();
        const materiasAvaliadas = avaliacoes.filter((av) => av.alunoId === aluno.id).map((av) => av.materiaId)

        const materias = aluno.materias.filter((materia) => !materiasAvaliadas.includes(materia.id))
        await Promise.all(materias.map((materia) => materia.load('professor')))
        await Promise.all(materias.map((materia) => materia.professor.load('user')))
        return materias.map((materia) => materia.serialize())
    }
}
