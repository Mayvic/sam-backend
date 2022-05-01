import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Materia from 'App/Models/Materia'

export default class MateriaSeeder extends BaseSeeder {
  public async run () {
    await Materia.createMany([
      {
        nome: 'Programação Web',
        codigo: 'PW001',
        descricao: 'Programação Web',
        codigo_entrada: 'javascript',
        periodo: '2021.2',
        professorId: 6
      },
      {
        nome: 'Estrutura de Dados II',
        codigo: 'IM001',
        descricao: 'ED2',
        codigo_entrada: 'arvoreB',
        periodo: '2021.2',
        professorId: 11
      },
      {
        nome: 'Arquitetura de Software',
        codigo: 'ES001',
        descricao: 'Arq. Soft.',
        codigo_entrada: 'pattern',
        periodo: '2021.2',
        professorId: 5
      },
      {
        nome: 'Compiladores',
        codigo: 'FH001',
        descricao: 'Compiladores',
        codigo_entrada: 'yacc',
        periodo: '2021.2',
        professorId: 3
      },
    ])
  }
}
