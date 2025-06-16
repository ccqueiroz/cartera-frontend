import { HandleRequestInfra } from "@/infra/api/handle-request.infra";

const handleRequest = new HandleRequestInfra().execute;

export { handleRequest };
