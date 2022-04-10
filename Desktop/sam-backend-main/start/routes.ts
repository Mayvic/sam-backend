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
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    const user = await User.findBy('email', email)
    return {
      user: {
        token,
        type: user?.type,
      },
    }
  } catch {
    return response.badRequest({ error: 'Invalid credentials' })
  }
})

Route.post('/student/create', async ({ request, response }) => {
  const name = request.input('name')
  const document = request.input('document')
  const email = request.input('email')
  const password = request.input('password')
  const confirmPassword = request.input('confirmPassword')

  if (!name || !document || !email || !password || !confirmPassword) {
    return response.badRequest({ error: 'Required information missing.' })
  }

  if (password !== confirmPassword) {
    return response.badRequest({ error: 'Passwords do not match.' })
  }

  let user = await User.findBy('email', email)
  if (user) {
    return response.badRequest({ error: 'User already exists.' })
  }

  user = await User.create({
    name,
    document,
    email,
    password,
    type: 0,
  })

  if (user) {
    return response.created({ user: { type: user.type } })
  }

  return response.internalServerError({ error: 'Something bad happened.' })
})

Route.get('/student', async () => {
  const users = await User.all()
  return users.filter((user) => user.type === 0).map((user) => user.serialize())
})
