import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'games' })
class Log {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Уникальный идентификатор',
  })
  public id: string;

  @Column({
    comment: 'Коньтекст',
    nullable: true,
  })
  public context!: string;

  @Column({
    comment: 'Текст лога',
  })
  public message: string;

  @Column({
    comment: 'Трэйс',
    nullable: true,
  })
  public stack!: string;

  @Column({
    comment: 'Уровень',
  })
  public level: string;

  @CreateDateColumn({
    comment: 'Дата события',
  })
  creationDate: Date;
}

export default Log;
