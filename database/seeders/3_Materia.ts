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
        professorId: 1
      },
      {
        nome: 'Programação Paralela',
        codigo: 'PP001',
        descricao: 'Programação Paralela e Distribuida',
        codigo_entrada: 'cuda',
        periodo: '2021.2',
        professorId: 2
      },
      {
        nome: 'Arquitetura de Software',
        codigo: 'ES001',
        descricao: 'Arq. Soft.',
        codigo_entrada: 'ddd',
        periodo: '2021.2',
        professorId: 3
      },
      {
        nome: 'Compiladores',
        codigo: 'FH001',
        descricao: 'Compiladores',
        codigo_entrada: 'flex/bison',
        periodo: '2021.2',
        professorId: 4
      },
    ])
  }
}
