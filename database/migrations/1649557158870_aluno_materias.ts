import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlunoMaterias extends BaseSchema {
  protected tableName = 'aluno_materia'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('aluno_id').unsigned().references('alunos.id')
      table.integer('materia_id').unsigned().references('materias.id')
      table.unique(['aluno_id', 'materia_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
