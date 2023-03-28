import { z } from "zod";

// 👇 Профиль пользователя Steam с дополнениями
export const UserSchema = z.object({
  steamid: z.string(), // SteamID - участвует почти во всех запросах к API Steam
  personaname: z.string(), // Никнэйм (последний указанный)
  profileurl: z.string(), // Ссылка на страницу профиля
  avatar: z.string(), // Аватар (URL) маленький
  avatarmedium: z.string(), // Аватар (URL) средний
  avatarfull: z.string(), // Аватар (URL) полный
  avatarhash: z.string(), // Хэш-сумма аватара
  realname: z.string(), // Реальное имя пользователя
  primaryclanid: z.string(),
  loccountrycode: z.string(),
  locstatecode: z.string(),
  communityvisibilitystate: z.number(),
  profilestate: z.number(),
  commentpermission: z.number(),
  lastlogoff: z.number(),
  personastate: z.number(),
  timecreated: z.number(),
  personastateflags: z.number(),
  loccityid: z.number(),
  playerlevel: z.nullable(z.number()),
  gameid: z.string().optional(),
  gameextrainfo: z.string().optional(),
  decorations: z.object({
    avatar: z.string(),
    frame: z.string(),
    background: z.string(),
    miniProfileBackground: z.string(),
  }),
});

export type User = z.infer<typeof UserSchema>;
// 👆 Профиль пользователя Steam с дополнениями

// 👇 Глобальная статистика пользователя для вывода в мини-профиле
export const UserStatsSchema = z.object({
  games: z.object({ // статистика по количеству игр и степени получения достижений
    platinum: z.nullable(z.number()).default(null), // 100% достижений
    gold: z.nullable(z.number()).default(null), // 90% - 99% достижений
    silver: z.nullable(z.number()).default(null), // 75% - 90% достижений
    bronze: z.nullable(z.number()).default(null), // меньше 75% достижений
  }),
});

export type UserStats = z.infer<typeof UserStatsSchema>;
// 👆 Глобальная статистика пользователя для вывода в мини-профиле

// 👇 Декорации профиля для извлечения объекта
// пользователя из базы и объединения с профилем из Steam
export const ProfileDecorationsSchema = z.object({
  avatar: z.string(), // аватар (URL)
  frame: z.string(), // рамка аватара (URL)
  background: z.string(), // основной фон профиля (URL)
  miniProfileBackground: z.string(), // фон мини-профиля (URL)
});

export type ProfileDecorations = z.infer<typeof ProfileDecorationsSchema>;
// 👆 Декорации профиля для извлечения объекта
// пользователя из базы и объединения с профилем из Steam
