import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8021",
  headers: {
    "Content-type": "application/json",
  },
});

const apiClientHolder = axios.create({
  baseURL: "http://localhost:8031",
  headers: {
    "Content-type": "application/json",
  },
});

export const getConnections = () => {
  return apiClient.get("/connections");
};

export const getConnectionById = (connectionId?: string) => {
  return apiClient.get(`/connections/${connectionId}`);
};

export const createConnectionInvitation = (requestBody: any) => {
  return apiClient.post("/connections/create-invitation", requestBody);
};

export const getSchemas = () => {
  return apiClient.get("/schemas/created");
};

export const getSchema = (schemaId: string) => {
  return apiClient.get(`/schemas/${schemaId}`);
};

export const getCredDefs = () => {
  return apiClient.get("/credential-definitions/created");
};

export const getCredDef = (credDefId: string) => {
  return apiClient.get(`/credential-definitions/${credDefId}`);
};

export const testGetEndpoints = () => {
  return apiClient.get(
    "/action-menu/eee54a41-3135-4067-b99a-478c5d11c572/fetch"
  );
};

export const issueCredentialSend = (requestBody: any) => {
  return apiClient.post("/issue-credential/send", requestBody);
};
