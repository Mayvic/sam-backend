import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Avaliacao from 'App/Models/Avaliacao'
import Materia from 'App/Models/Materia';
import Professor from 'App/Models/Professor';
import CreateMateriaValidator from 'App/Validators/CreateMateriaValidator';
import { randomInt } from 'crypto';

export default class MateriasController {
    public async index({ auth, request }: HttpContextContract) {
        const flagAvaliadas = request.input('avaliadas');
        const periodo = request.input('periodo');

        let materias = await Materia.all();

        if (flagAvaliadas !== undefined) {
            const user = auth.user!;
            const aluno = await Aluno.findByOrFail('user_id', user.id)
            await aluno.load('materias')
            const avaliacoes = await Avaliacao.all();
            const materiasAvaliadas = avaliacoes.filter((av) => av.alunoId === aluno.id).map((av) => av.materiaId)
            materias = aluno.materias.filter((materia) => (flagAvaliadas === 0 ? !materiasAvaliadas.includes(materia.id) : materiasAvaliadas.includes(materia.id)))
        }

        if (periodo !== undefined) {
            materias = materias.filter((materia) =>  materia.periodo === periodo)
        }

        await Promise.all(materias.map((materia) => materia.load('professor')))
        await Promise.all(materias.map((materia) => materia.professor.load('user')))
        return materias.map((materia) => materia.serialize())
    }

    public async create({ request }: HttpContextContract) {
        const { nome, descricao, codigo, periodo, professor } = await request.validate(CreateMateriaValidator);
        const codigo_entrada = this.generateCodigo()
        const prof = await Professor.findOrFail(professor)
        const materia = await Materia.create({
            nome,
            descricao,
            codigo,
            codigo_entrada,
            periodo,
            professorId: professor
        })

        await materia.related('professor').associate(prof)

        return materia.serialize()
    }

    private generateCodigo(size: number = 8): string {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let codigo = '';
        for (let i = 0; i < size; i++) {
            const n = randomInt(chars.length)
            codigo += chars[n]
        }
        return codigo
    }
}
