import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Avaliacao from 'App/Models/Avaliacao'
import Materia from 'App/Models/Materia';

export default class RelatoriosController {
  public async index({ }: HttpContextContract) {
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
        0: previous[question] + current[question],
        1: previous[question] + current[question],
        2: previous[question] + current[question],
        3: previous[question] + current[question],
        4: previous[question] + current[question],
        5: previous[question] + current[question]
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
        primeira_vez: this.countQuestion(avaliacoes, 'primeira_vez'),
        frequencia: this.countQuestion(avaliacoes, 'frequencia'),
        entendimento: this.countQuestion(avaliacoes, 'entendimento'),
        esforco: this.countQuestion(avaliacoes, 'esforco'),
        pre_req: this.countQuestion(avaliacoes, 'pre_req'),
        area: this.countQuestion(avaliacoes, 'area'),
        conhecimento: this.countQuestion(avaliacoes, 'conhecimento')
      },

      comentarios: this.groupComments(avaliacoes)
    };
  }
}
