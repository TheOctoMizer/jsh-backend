import { getStoredJson, storeJson, updateStoredJson } from "../utils/firebase";
import {
  AddJobIdentifierRequest,
  GetJobIdentifierRequest,
  jobUrlIdentifier,
} from "../models";
import { FastifyRequest, FastifyReply } from "fastify";

async function addIdentifier(
  request: FastifyRequest<{ Body: AddJobIdentifierRequest }>,
  response: FastifyReply
) {
  try {
    if (!request) {
      return response.status(400).send({ error: "Request is required" });
    }
    const identifier = request.body.identifier;
    if (!identifier) {
      return response.status(400).send({ error: "Identifier is required" });
    }
    let data = await getStoredJson("extensionData");
    if (!data) {
      console.log({
        addIdentifier: {
          consoleMessage: "No data found: Creating new record",
          data: identifier,
        },
      });
      // Create the initial data structure
      data = {
        identifiers: [], // Initialize the identifiers array
      };
    }
    const identifierRecordToAdd: jobUrlIdentifier = {
      identifier: identifier,
      timestamp: new Date(),
    };
    data.identifiers.push(identifierRecordToAdd);
    // await updateStoredJson("identifiers", data);
    const success = await storeJson(data, "extensionData");
    if (!success) {
      return response.status(500).send({ error: "Failed to update data" });
    }
    return response.send({ message: "Identifier added successfully" });
  } catch (error) {
    console.error("Error adding identifier:", error);
    return response.status(500).send({ error: "Internal Server Error" });
  }
}

async function getIdentifier(
  request: FastifyRequest<{ Body: GetJobIdentifierRequest }>,
  response: FastifyReply
) {
  const { key } = request.body;
  console.log({
    getIdentifier: {
      consoleMessage: `Getting identifier with key ${key}`,
      data: key,
    },
  });

  //   try {
  //     const data = await getStoredJson("extensionData");
  //     if (!data || !Array.isArray(data.identifiers)) {
  //       return response.status(404).send({ error: "No identifiers found" });
  //     }
  //     const identifierRecord = data.identifiers.find(
  //       (record: Array<{ identifier: string; timestamp: string }>) =>
  //         record.identifier === key
  //     );
  //     return response.send(identifierRecord);
  //   } catch (error) {
  //     console.error("Error getting identifier:", error);
  //     return response.status(500).send({ error: "Internal Server Error" });
  //   }
}

export { addIdentifier, getIdentifier };
