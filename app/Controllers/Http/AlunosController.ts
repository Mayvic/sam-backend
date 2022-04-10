import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import User from 'App/Models/User'
import CreateAlunoValidator from 'App/Validators/CreateAlunoValidator'
import UpdateAlunoValidator from 'App/Validators/UpdateAlunoValidator'

export default class AlunosController {
  public async index({ request }: HttpContextContract) {
    const invalid = request.input('invalid', 0);
    const valid = request.input('valid', 0);
    
    let alunos = await Aluno.all();

    if (invalid !== 0) {
      alunos = alunos.filter((aluno) => !aluno.isValid);
    } else if (valid !== 0) {
      alunos = alunos.filter((aluno) => aluno.isValid);
    }

    await Promise.all(alunos.map(async (aluno) => aluno.load('user')));
    return alunos.map((aluno) => aluno.serialize());
  }

  public async create({request, response}: HttpContextContract) {
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

  public async show({ auth, request }: HttpContextContract) {
      const user = auth.user!;
      const id = user.type == 0 ? user.id : request.param('id');
      const aluno = await Aluno.findBy('user_id', id);
      await aluno.load('user');
      
      if (user.type === 0) {
        await aluno.load('materias');
      }

      return aluno.serialize();
  }

  public async update({ auth, request, response }: HttpContextContract) {
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
      response.badRequest({errors: [{
        rule: 'unique',
        field: 'email',
        message: 'email is already used.'
      }]});
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    const aluno = await Aluno.findOrFail(auth.user!.id);
    await aluno.load('user');
    await aluno.user.delete();
  }

  public async validate({ request }: HttpContextContract) {
    const id = request.input('id');
    const aluno = await Aluno.findOrFail(id);
    aluno.isValid = true;
    aluno.save()
  }
}
