import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.create({
      name: 'Mayla',
      document: '2017780000',
      email: 'mayla@email.com',
      type: 0,
      password: 'senha',
    })
  }
}
