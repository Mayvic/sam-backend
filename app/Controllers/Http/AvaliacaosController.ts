import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno';
import Avaliacao from 'App/Models/Avaliacao'
import Materia from 'App/Models/Materia';

export default class AvaliacaosController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!
    const aluno = await Aluno.findByOrFail('user_id', user.id)
    let avaliacoes = await Avaliacao.all()
    avaliacoes = avaliacoes.filter((av) => av.alunoId === aluno.id)

    await Promise.all(
      avaliacoes.map((av) => {
        Promise.all([
          av.load('materia'),
          av.load('professor')
        ]);
      })
    );
    return avaliacoes.map((av) => av.serialize())
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const id = auth.user!.id;
    const aluno = await Aluno.findByOrFail('user_id', id);
    const materia = await Materia.findOrFail(request.input('materiaId'));
    const codigo_entrada = request.input('codigo');
    if (materia.codigo_entrada !== codigo_entrada) {
      return response.badRequest({
        error: 'codigo de entrada não confere.'
      });
    }

    await materia.load('professor')

    const avaliacao = {
      alunoId: aluno.id,
      materiaId: materia.id,
      professorId: materia.professorId,

      // sobre a MATERIA
      clareza: request.input('materia.clareza'),
      relevancia: request.input('materia.relevancia'),
      ementa: request.input('materia.ementa'),
      distribuicao: request.input('materia.distribuicao'),
      material: request.input('materia.material'),
      lab: request.input('materia.lab'),
      dificuldade: request.input('materia.dificuldade'),

      // sobre o PROF
      dominio: request.input('professor.dominio'),
      didatica: request.input('professor.didatica'),
      apresentacao: request.input('professor.apresentacao'),
      avaliacoes: request.input('professor.avaliacoes'),
      disponibilidade: request.input('professor.disponibilidade'),
      assiduidade: request.input('professor.assiduidade'),
      indicaria: request.input('professor.indicaria'),

      // sobre o ALUNO
      primeiraVez: request.input('aluno.primeiraVez'),
      frequencia: request.input('aluno.frequencia'),
      entendimento: request.input('aluno.entendimento'),
      esforco: request.input('aluno.esforco'),
      pre_req: request.input('aluno.pre_req'),
      area: request.input('aluno.area'),
      conhecimento: request.input('aluno.conhecimento'),

      comentarios: request.input('comentarios'),
    };

    const av = await Avaliacao.create(avaliacao);
    return response.created({
      aluno: av.alunoId,
      materia: av.materiaId
    });
  }
}
