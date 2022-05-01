import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Avaliacao from 'App/Models/Avaliacao'
import Materia from 'App/Models/Materia';
import Professor from 'App/Models/Professor';
import CreateMateriaValidator from 'App/Validators/CreateMateriaValidator';
import { randomInt } from 'crypto';

export default class MateriasController {
    public async index({ auth, bouncer, request }: HttpContextContract) {
        await bouncer.authorize('viewMaterias');
        const flagAvaliadas = request.input('avaliadas');
        const periodo = request.input('periodo');

        let materias = await Materia.all();

        if (flagAvaliadas !== undefined) {
            const user = auth.user!;
            const aluno = await Aluno.findByOrFail('user_id', user.id);
            
            const avaliacoes = await Avaliacao.all();
            const materiasAvaliadas = avaliacoes.filter((av) => av.alunoId === aluno.id).map((av) => av.materiaId);
            materias = materias.filter((materia) => (flagAvaliadas === '0' ? !materiasAvaliadas.includes(materia.id) : materiasAvaliadas.includes(materia.id)));
        }

        if (periodo !== undefined) {
            materias = materias.filter((materia) =>  materia.periodo === periodo);
        }

        if (auth.user?.type === 1) {
            const user = auth.user!;
            const prof = await Professor.findByOrFail('user_id', user.id);

            materias = materias.filter((materia) => materia.professorId === prof.id);
        }

        await Promise.all(materias.map((materia) => materia.load('professor')));
        await Promise.all(materias.map((materia) => materia.professor.load('user')));
        return materias.map((materia) => materia.serialize());
    }

    public async get({ bouncer, request }: HttpContextContract) {
        const id = request.param('id');
        const materia = await Materia.findOrFail(id);
        
        await bouncer.authorize('viewMateriaInfo', materia);
        await materia.load('professor');
        await materia.professor.load('user');
        return materia.serialize();
    }

    public async update({ bouncer, request }: HttpContextContract) {
        await bouncer.authorize('updateMateria');
        const { nome, descricao, codigo, periodo, professorId } = await request.validate(CreateMateriaValidator);
        const id = request.param('id');
        const materia = await Materia.findOrFail(id);

        const prof = await Professor.findOrFail(professorId);
        materia.nome = nome;
        materia.descricao = descricao;
        materia.codigo = codigo;
        materia.periodo = periodo;
        materia.professorId = professorId;

        await materia.save()
        await materia.related('professor').associate(prof);

        return materia.serialize();
    }

    public async create({ bouncer, request }: HttpContextContract) {
        await bouncer.authorize('createMateria');
        const { nome, descricao, codigo, periodo, professorId } = await request.validate(CreateMateriaValidator);
        const codigo_entrada = this.generateCodigo();
        const prof = await Professor.findOrFail(professorId);
        const materia = await Materia.create({
            nome,
            descricao,
            codigo,
            codigo_entrada,
            periodo,
            professorId: professorId
        });

        await materia.related('professor').associate(prof);

        return materia.serialize();
    }

    private generateCodigo(size: number = 8): string {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let codigo = '';
        for (let i = 0; i < size; i++) {
            const n = randomInt(chars.length);
            codigo += chars[n];
        }
        return codigo;
    }
}
