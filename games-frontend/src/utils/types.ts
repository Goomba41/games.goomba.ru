import { z } from "zod";

export const UserSchema = z.object({
  steamid: z.string(),
  personaname: z.string(),
  profileurl: z.string(),
  avatar: z.string(),
  avatarmedium: z.string(),
  avatarfull: z.string(),
  avatarhash: z.string(),
  realname: z.string(),
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
