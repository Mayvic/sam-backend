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
    Route.get('/', 'AlunosController.index'); // get all students
    Route.put('/', 'AlunosController.update'); // update student (self)
    Route.get('me', 'AlunosController.get'); // get own info
    Route.get(':id', 'AlunosController.get'); // get other's info
    Route.delete('me', 'AlunosController.destroy'); // delete student (self)
    Route.post('validate/:id', 'AlunosController.validate') // validate
  }).middleware('auth');

  Route.post('create', 'AlunosController.create');
}).prefix('student');

Route.group(() => {
  Route.get('/', 'AvaliacaosController.index');
  Route.post('create', 'AvaliacaosController.create');
}).prefix('evaluation').middleware('auth');
