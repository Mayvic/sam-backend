import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Professor from 'App/Models/Professor'


export default class Materia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public descricao: string

  @column()
  public codigo: string

  @column()
  public codigo_entrada: string

  @column()
  public periodo: string

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
