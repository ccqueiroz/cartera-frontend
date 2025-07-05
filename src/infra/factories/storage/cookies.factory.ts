import { cookies } from "next/headers";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";

const cookiesFactory = async () => new CookieServerStorage(await cookies());

export { cookiesFactory };
