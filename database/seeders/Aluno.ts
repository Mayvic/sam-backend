import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Aluno from 'App/Models/Aluno'
import User from 'App/Models/User'

export default class AlunoSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = await User.create({
      name: 'Mayla',
      document: '2017780000',
      email: 'mayla@email.com',
      type: 0,
      password: 'senha',
    });
    
    const aluno = await Aluno.create({
      isValid: true,
      userId: user.id
    });
    await aluno.related('user').associate(user)
  }
}
