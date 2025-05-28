export type CookieOptions = {
  path: string;
  httpOnly: boolean;
  maxAge: number;
  sameSite: true | false | "lax" | "strict" | "none" | undefined;
};
