import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "http://ip172-18-0-33-cgfnavgsf2q000afl6gg-8021.direct.labs.play-with-docker.com",
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
