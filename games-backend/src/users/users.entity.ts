import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'games' })
export default class User {
  @PrimaryColumn({ unique: true, comment: 'SteamId для использования в API' })
  steamid: string;

  @CreateDateColumn({
    comment: 'Дата регистрации',
  })
  signup: Date;

  @CreateDateColumn({ comment: 'Дата последнего входа' })
  signin: Date;
}
