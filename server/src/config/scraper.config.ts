import axios from "axios";

export const anakinClient = axios.create({
  baseURL: process.env.ANAKIN_BASE as string,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.ANAKIN_API_KEY as string,
  },
});
