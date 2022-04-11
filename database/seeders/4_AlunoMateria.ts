import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Aluno from 'App/Models/Aluno'
import Materia from 'App/Models/Materia';

export default class AlunoMateriaSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const alunos = await Aluno.all();
    const materias = await Materia.all();
    await Promise.all(alunos.map((aluno) => aluno.related('materias').saveMany(materias)));
  }
}
