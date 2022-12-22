import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'games' })
export class User {
  @PrimaryColumn({ unique: true })
  steamid!: string;

  //   @Column()
  //   firstName: string;

  //   @Column()
  //   lastName: string;

  //   @Column({ default: true })
  //   isActive: boolean;
}
