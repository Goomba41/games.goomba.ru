import { CreateDateColumn, Entity, PrimaryColumn, Column } from "typeorm";

export interface IProfileDecorations {
  avatar: string;
  frame: string;
  background: string;
  miniProfileBackground: string;
}

@Entity({ name: "users", schema: "games" })
export default class User {
  @PrimaryColumn({ unique: true, comment: "SteamId для использования в API" })
  steamId: string;

  @CreateDateColumn({
    comment: "Дата регистрации",
  })
  signUp: Date;

  @CreateDateColumn({ comment: "Дата последнего входа" })
  signIn: Date;

  @Column({
    type: "json",
    comment: "Визуальные украшения профиля (рамка, фоны, аватар)",
    nullable: true,
  })
  profileDecorations: IProfileDecorations;
}
