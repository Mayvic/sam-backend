import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import User from 'App/Models/User'
import CreateAlunoValidator from 'App/Validators/CreateAlunoValidator'
import UpdateAlunoValidator from 'App/Validators/UpdateAlunoValidator'

export default class AlunosController {
  public async create({ request, response }: HttpContextContract) {
    const { name, document, email, password } = await request.validate(CreateAlunoValidator);

    const user = await User.create({
      name,
      document,
      email,
      password,
      type: 0,
    });

    const aluno = await (await Aluno.create({ userId: user.id })).related('user').associate(user);

    if (user !== null && aluno !== null) {
      return response.created({ user: { type: user.type } });
    }

    return response.internalServerError({ error: 'Something bad happened.' });
  }

  public async show({ auth, bouncer }: HttpContextContract) {
    await bouncer.authorize('viewStudentSelf');
    const user = auth.user!; ''
    const aluno = await Aluno.findByOrFail('user_id', user.id);
    await aluno.load('user');

    return aluno.serialize();
  }

  public async update({ auth, bouncer, request, response }: HttpContextContract) {
    await bouncer.authorize('updateStudentSelf');
    const { name, document, email, password } = await request.validate(UpdateAlunoValidator);

    const user = auth.user!;

    const foundUser = await User.findBy('email', email);
    if (foundUser === null || foundUser.id === user.id) {
      user.name = name;
      user.document = document;
      user.email = email;
      user.password = password;

      await user.save();
    } else {
      response.badRequest({
        errors: [{
          rule: 'unique',
          field: 'email',
          message: 'email is already used.'
        }]
      });
    }
  }

  public async destroy({ auth, bouncer }: HttpContextContract) {
    await bouncer.authorize('destroyStudentSelf');
    const aluno = await Aluno.findOrFail(auth.user!.id);
    await aluno.load('user');
    await aluno.user.delete();
  }
}
