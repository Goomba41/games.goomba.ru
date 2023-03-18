import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

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
}
