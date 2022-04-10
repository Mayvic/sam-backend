import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Avaliacaos extends BaseSchema {
  protected tableName = 'avaliacoes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('aluno_id').unsigned().references('alunos.id').nullable().onDelete('SET NULL')
      table.integer('professor_id').unsigned().references('professors.id').onDelete('CASCADE')
      table.integer('materia_id').unsigned().references('materias.id').onDelete('CASCADE')
      table.unique(['aluno_id', 'materia_id'])
      
      // sobre a MATERIA
      table.integer('clareza')
      table.integer('relevancia')
      table.integer('ementa')
      table.integer('distribuição')
      table.integer('material')
      table.integer('lab')
      table.integer('dificuldade')

      // sobre o PROF
      table.integer('dominio')
      table.integer('didatica')
      table.integer('apresentacao')
      table.integer('avaliacoes')
      table.integer('disponibilidade')
      table.integer('assiduidade')
      table.integer('indicaria')

      // sobre o ALUNO
      table.integer('primeiraVez')
      table.integer('frequencia')
      table.integer('entendimento')
      table.integer('esforço')
      table.integer('pre-req')
      table.integer('area')
      table.integer('conhecimento')

      table.text('comentarios')

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
