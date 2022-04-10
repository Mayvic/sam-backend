import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Aluno from 'App/Models/Aluno'
import Materia from 'App/Models/Materia'
import Professor from 'App/Models/Professor'

export default class Avaliacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public alunoId: number

  @belongsTo(() => Aluno)
  public aluno: BelongsTo<typeof Aluno>
  
  @column()
  public materiaId: number

  @belongsTo(() => Materia)
  public materia: BelongsTo<typeof Materia>
  
  @column()
  public professorId: number

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  // sobre a disciplina

  @column()
  public clareza: number
  
  @column()
  public relevancia: number
  
  @column()
  public ementa: number
  
  @column()
  public distribuicao: number
  
  @column()
  public material: number
  
  @column()
  public lab: number
  
  @column()
  public dificuldade: number

  // sobre o professor

  @column()
  public dominio: number
  
  @column()
  public didatica: number
  
  @column()
  public apresentacao: number
  
  @column()
  public avaliacoes: number
  
  @column()
  public disponibilidade: number
  
  @column()
  public assiduidade: number
  
  @column()
  public indicaria: number

  // sobre o aluno

  @column()
  public primeiraVez: number

  @column()
  public frequencia: number

  @column()
  public entendimento: number

  @column()
  public esforco: number

  @column()
  public preReq: number

  @column()
  public area: number

  @column()
  public conhecimento: number
  
  // comentarios

  @column()
  public comentarios: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
