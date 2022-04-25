import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Avaliacao from 'App/Models/Avaliacao'
import Materia from 'App/Models/Materia';

export default class RelatoriosController {
  public async index({ bouncer }: HttpContextContract) {
    await bouncer.authorize('viewOverallReport');
    const materias = await Materia.all();
    const avaliacoes = await Avaliacao.all();

    return materias.map((materia) => {
      const avs = avaliacoes.filter((av) => av.materiaId === materia.id);

      return {
        materiaId: materia.id,
        ...this.constructMiniReport(avs)
      };
    }); 
  }

  public async get({ bouncer, request }: HttpContextContract) {
    const id = request.param('id');
    const materia = await Materia.findOrFail(id);
    
    await bouncer.authorize('viewReport', materia);
    let avaliacoes = await Avaliacao.all();
    avaliacoes = avaliacoes.filter((av) => av.materiaId === materia.id);
    return {
      materiaId: materia.id,
      ...this.constructMiniReport(avaliacoes)
    };
  }

  private countQuestion(avaliacoes: Avaliacao[], question: string) {
    if (avaliacoes.length === 0) {
      return {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };
    }

    return avaliacoes.map((av) => {
      return {
        0: av[question] === 0 ? 1 : 0,
        1: av[question] === 1 ? 1 : 0,
        2: av[question] === 2 ? 1 : 0,
        3: av[question] === 3 ? 1 : 0,
        4: av[question] === 4 ? 1 : 0,
        5: av[question] === 5 ? 1 : 0
      }
    }).reduce((previous, current) => {
      return {
        0: previous[0] + current[0],
        1: previous[1] + current[1],
        2: previous[2] + current[2],
        3: previous[3] + current[3],
        4: previous[4] + current[4],
        5: previous[5] + current[5]
      }
    });
  }

  private groupComments(avaliacoes: Avaliacao[]) {
    return avaliacoes
      .filter((av) => av.comentarios !== null)
      .map((av) => av.comentarios);
  }

  private constructMiniReport(avaliacoes: Avaliacao[]) {
    return {
      count: avaliacoes.length,
      materia: {
        clareza: this.countQuestion(avaliacoes, 'clareza'),
        relevancia: this.countQuestion(avaliacoes, 'relevancia'),
        ementa: this.countQuestion(avaliacoes, 'ementa'),
        distribuicao: this.countQuestion(avaliacoes, 'distribuicao'),
        material: this.countQuestion(avaliacoes, 'material'),
        lab: this.countQuestion(avaliacoes, 'lab'),
        dificuldade: this.countQuestion(avaliacoes, 'dificuldade')
      },

      professor: {
        dominio: this.countQuestion(avaliacoes, 'dominio'),
        didatica: this.countQuestion(avaliacoes, 'didatica'),
        apresentacao: this.countQuestion(avaliacoes, 'apresentacao'),
        avaliacoes: this.countQuestion(avaliacoes, 'avaliacoes'),
        disponibilidade: this.countQuestion(avaliacoes, 'disponibilidade'),
        assiduidade: this.countQuestion(avaliacoes, 'assiduidade'),
        indicaria: this.countQuestion(avaliacoes, 'indicaria')
      },

      aluno: {
        primeira_vez: this.countQuestion(avaliacoes, 'primeiraVez'),
        frequencia: this.countQuestion(avaliacoes, 'frequencia'),
        entendimento: this.countQuestion(avaliacoes, 'entendimento'),
        esforco: this.countQuestion(avaliacoes, 'esforco'),
        pre_req: this.countQuestion(avaliacoes, 'preReq'),
        area: this.countQuestion(avaliacoes, 'area'),
        conhecimento: this.countQuestion(avaliacoes, 'conhecimento')
      },

      comentarios: this.groupComments(avaliacoes)
    };
  }
}
