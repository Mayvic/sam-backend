import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor';
import User from 'App/Models/User';

export default class ProfessorSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const users = await User.createMany([
      {
        name: 'Adria Lyra',
        document: '000001',
        email: 'adria@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Bruno Dembogurski',
        document: '000002',
        email: 'dembogurski@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Daniel Posner',
        document: '000003',
        email: 'posner@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Fellipe Duarte',
        document: '000004',
        email: 'duarte@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Fernanda Couto',
        document: '000005',
        email: 'fernanda@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Filipe Braida',
        document: '000006',
        email: 'braida@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Juliana Mendes',
        document: '000007',
        email: 'juliana@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Leandro Alvim',
        document: '000008',
        email: 'alvim@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Ligia Passos',
        document: '000009',
        email: 'ligia@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Marcel Silva',
        document: '000010',
        email: 'marcel@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Marcelo Zamith',
        document: '000011',
        email: 'zamith@email.com',
        type: 2,
        password: 'senha',
      },
      {
        name: 'Natalia Schots',
        document: '000012',
        email: 'natalia@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Ricardo Correa',
        document: '000013',
        email: 'ricardo@email.com',
        type: 1,
        password: 'senha',
      },
      {
        name: 'Ubiratam de Paula',
        document: '000014',
        email: 'ubiratam@email.com',
        type: 1,
        password: 'senha',
      },
    ]);
    
    for (const i in users) {
      const prof = await Professor.create({ userId: users[i].id });
      await prof.related('user').associate(users[i]);
    }
  }
}
