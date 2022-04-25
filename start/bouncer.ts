/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Aluno from 'App/Models/Aluno'
import Materia from 'App/Models/Materia'
import Professor from 'App/Models/Professor'
import User from 'App/Models/User'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
export const { actions } = Bouncer

Bouncer.define('updateStudentSelf', (user: User) => {
    return user.type === 0;
})
.define('viewStudentSelf', (user: User) => {
    return user.type === 0;
})
.define('deleteStudentSelf', (user: User) => {
    return user.type === 0;
})
.define('viewProfessors', (user: User) => {
    return user.type === 2;
})
.define('viewEvaluationsSelf', (user: User) => {
    return user.type === 0;
})
.define('createEvaluations', (user: User) => {
    return user.type === 0;
})
.define('viewMaterias', (user: User) => {
    return user.type === 0 || user.type == 1 || user.type == 2;
})
.define('viewMateriaInfo', async (user: User, materia: Materia) => {
    if (user.type === 1) {
        const prof = await Professor.findByOrFail('user_id', user.id);
        return materia.professorId === prof.id;
    } 
    return user.type === 2;
})
.define('updateMateria', (user: User) => {
    return user.type === 2;
})
.define('createMateria', (user: User) => {
    return user.type === 2;
})
.define('viewOverallReport', (user: User) => {
    return user.type === 2;
})
.define('viewReport', async (user: User, materia: Materia) => {
    if (user.type === 1) {
        const prof = await Professor.findByOrFail('user_id', user.id);
        return materia.professorId === prof.id;
    } 
    return user.type === 2;
})

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
