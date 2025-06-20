export type CookieOptions = {
  path: string;
  httpOnly: boolean;
  maxAge: number;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure: boolean;
  expires: Date;
};
