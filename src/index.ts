import { fastify, FastifyReply, FastifyRequest } from "fastify";
import getExtensionData from "./routes/getExtensionData";
import { addIdentifier, getIdentifier } from "./routes/jobUrlIdentifier";
import * as dotenv from "dotenv";
import { AddJobIdentifierRequest, GetJobIdentifierRequest } from "./models";

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = fastify({
  logger: true,
});

server.get("/", async (request, response) => {
  return { hello: "world", port: PORT };
});

server.get("/extension-data", async (request, response) => {
  return getExtensionData(request, response);
});

server.post(
  "/add-identifier",
  async (
    request: FastifyRequest<{ Body: AddJobIdentifierRequest }>,
    response: FastifyReply
  ) => {
    return addIdentifier(request, response);
  }
);

server.post(
  "/get-identifiers",
  async (
    request: FastifyRequest<{ Body: GetJobIdentifierRequest }>,
    response: FastifyReply
  ) => {
    return getIdentifier(request, response);
  }
);

server.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
