import { HandleRequestInfra } from "@/infra/api/handle-request.infra";

const handleRequestFactory = new HandleRequestInfra().execute;

export { handleRequestFactory };
