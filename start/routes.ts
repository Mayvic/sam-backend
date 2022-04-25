/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' };
})

Route.post('/login', 'LoginController.signIn');
Route.post('/logout', 'LoginController.signOut').middleware('auth');

Route.group(() => { // student
  Route.group(() => { // authenticated
    Route.put('/', 'AlunosController.update'); // update student (self)
    Route.get('me', 'AlunosController.show'); // get own info
    Route.delete('me', 'AlunosController.destroy'); // delete student (self)
  }).middleware('auth');

  Route.post('create', 'AlunosController.create'); // create new student
}).prefix('student');

Route.group(() => { // professor
  Route.get('/', 'ProfessorsController.index');
}).prefix('professor').middleware('auth');

Route.group(() => { // evaluation
  Route.get('/', 'AvaliacaosController.index'); // get all evaluations
  Route.post('create', 'AvaliacaosController.create'); // create new evaluation
}).prefix('evaluation').middleware('auth');

Route.group(() => { // materia
  Route.get('/', 'MateriasController.index'); // pegar materias
  Route.get('/:id', 'MateriasController.get'); // pegar info de materia
  Route.put('/', 'MateriasController.update'); // alterar materia
  Route.post('/', 'MateriasController.create'); // criar materia
}).prefix('materias').middleware('auth');

Route.group(() => { // relatorio
  Route.get('/', 'RelatoriosController.index');
  Route.get(':id', 'RelatoriosController.get');
}).prefix('report').middleware('auth');

Route.group(() => { // user
  Route.get('/', 'UsersController.index');
}).prefix('user').middleware('auth');
