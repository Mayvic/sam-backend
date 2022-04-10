import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor';
import User from 'App/Models/User';

export default class ProfessorSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const users = await User.createMany([
      {
        name: 'Braida',
        document: '123456',
        email: 'braida@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Zamith',
        document: '123456',
        email: 'zamith@email.com',
        type: 2,
        password: 'senha',
      },
    ]);
    
    for (const i in users) {
      const prof = await Professor.create({ userId: users[i].id });
      await prof.related('user').associate(users[i]);
    }
  }
}
