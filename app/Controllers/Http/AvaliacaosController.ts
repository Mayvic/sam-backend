import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno';
import Avaliacao from 'App/Models/Avaliacao'
import Materia from 'App/Models/Materia';

export default class AvaliacaosController {
    public async index({}: HttpContextContract) {
        const avaliacoes = await Avaliacao.all()
        await Promise.all(avaliacoes.map((av) => {
            Promise.all([
                av.load('materia'),
                av.load('professor')
            ]);
        }));
        return avaliacoes.map((av) => av.serialize())
    }

    public async create({ auth, request, response }: HttpContextContract) {
        const id = auth.user!.id;
        const aluno = await Aluno.findByOrFail('user_id', id);
        const materia = await Materia.findOrFail(request.input('materiaId'));
        await materia.load('professor')
        
        const avaliacao = {
            alunoId: aluno.id,
            materiaId: materia.id,
            professorId: materia.professorId,

            // sobre a MATERIA
            clareza: request.input('clareza'),
            relevancia: request.input('relevancia'),
            ementa: request.input('ementa'),
            distribuicao: request.input('distribuicao'),
            material: request.input('material'),
            lab: request.input('lab'),
            dificuldade: request.input('dificuldade'),

            // sobre o PROF
            dominio: request.input('dominio'),
            didatica: request.input('didatica'),
            apresentacao: request.input('apresentacao'),
            avaliacoes: request.input('avaliacoes'),
            disponibilidade: request.input('disponibilidade'),
            assiduidade: request.input('assiduidade'),
            indicaria: request.input('indicaria'),

            // sobre o ALUNO
            primeiraVez: request.input('primeiraVez'),
            frequencia: request.input('frequencia'),
            entendimento: request.input('entendimento'),
            esforco: request.input('esforco'),
            pre_req: request.input('pre_req'),
            area: request.input('area'),
            conhecimento: request.input('conhecimento'),

            comentarios: request.input('comentarios'),
        };

        const av = await Avaliacao.create(avaliacao);
        return response.created({
            aluno: av.alunoId,
            materia: av.materiaId
        });
    }
}
