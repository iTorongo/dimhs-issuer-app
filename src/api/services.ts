import axios from "axios";

const HOSPITAL_API_HOST = "http://localhost:8021/";

const apiClient = axios.create({
  baseURL: HOSPITAL_API_HOST,
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

export const acceptConnection = (connectionId?: string) => {
  return apiClient.post(`/connections/${connectionId}/accept-request`);
};

export const createConnectionInvitation = (requestBody: any) => {
  return apiClient.post("/connections/create-invitation", requestBody);
};

export const getSchemas = () => {
  return apiClient.get("/schemas/created");
};

export const createSchema = (requestBody: any) => {
  return apiClient.post("/schemas", requestBody);
};

export const getSchemaDetails = (schemaId: string) => {
  return apiClient.get(`/schemas/${schemaId}`);
};

export const getCredDefs = () => {
  return apiClient.get("/credential-definitions/created");
};

export const getCredDefDetails = (credDefId: string) => {
  return apiClient.get(`/credential-definitions/${credDefId}`);
};

export const createCredentialDefinition = (requestBody: any) => {
  return apiClient.post("/credential-definitions", requestBody);
};

export const testGetEndpoints = () => {
  return apiClient.get(
    "/action-menu/eee54a41-3135-4067-b99a-478c5d11c572/fetch"
  );
};

export const getIssueCredentials = () => {
  return apiClient.get("/issue-credential/records");
};

export const getPublicDIDFromWallet = () => {
  return apiClient.get("/wallet/did/public");
};

export const issueCredentialSend = (requestBody: any) => {
  return apiClient.post("/issue-credential/send", requestBody);
};

export const createCredential = (requestBody: any) => {
  return apiClient.post("/issue-credential/create", requestBody);
};

export const sendCredentialOffer = (requestBody: any) => {
  return apiClient.post("/issue-credential/send-offer", requestBody);
};
