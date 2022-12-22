import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'games' })
export class User {
  @PrimaryColumn({ unique: true })
  id!: string;

  //   @Column()
  //   firstName: string;

  //   @Column()
  //   lastName: string;

  //   @Column({ default: true })
  //   isActive: boolean;
}
