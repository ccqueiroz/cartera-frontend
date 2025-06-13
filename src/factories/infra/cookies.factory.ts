import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";

const cookiesStorageFactory = new CookieServerStorage();

export { cookiesStorageFactory };
