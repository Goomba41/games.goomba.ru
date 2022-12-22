import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'games' })
export class User {
  @Column({ unique: true })
  id: string;

  //   @Column()
  //   firstName: string;

  //   @Column()
  //   lastName: string;

  //   @Column({ default: true })
  //   isActive: boolean;
}
