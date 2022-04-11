import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Aluno from 'App/Models/Aluno'
import User from 'App/Models/User'

export default class AlunoSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const users = await User.createMany([
      {
        name: 'Mayla',
        document: '2017780000',
        email: 'mayla@email.com',
        type: 0,
        password: 'senha',
      },
      {
        name: 'andrey',
        document: '2017780001',
        email: 'andrey@email.com',
        type: 0,
        password: 'senha',
      },
      {
        name: 'Thiago',
        document: '2018780000',
        email: 'thiago@email.com',
        type: 0,
        password: 'senha',
      },
    ]);

    for (const i in users) {
      const aluno = await Aluno.create({ isValid: true, userId: users[i].id });
      await aluno.related('user').associate(users[i]);
    }
  }
}
