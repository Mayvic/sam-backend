import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Materia from 'App/Models/Materia'

export default class MateriaSeeder extends BaseSeeder {
  public async run () {
    await Materia.create({
      nome: 'Programação Web',
      codigo: 'IM???',
      descricao: 'Programação Web',
      codigo_entrada: 'javascript',
      periodo: '2021.2',
      professorId: 1
    })
  }
}
