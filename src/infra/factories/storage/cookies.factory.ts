"use server";

import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { cookies } from "next/headers";

const cookiesFactory = async () => {
  const storage = await cookies();

  return new CookieServerStorage(storage);
};

export { cookiesFactory };
