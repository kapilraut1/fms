/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { PlayerFormValues } from "@/type/Type";

const baseURL = "http://localhost:3000";

export const api = axios.create({
  baseURL,
});

export const getPlayers = async (page = 1, limit = 10) => {
  const res = await api.get(`/players?page=${page}&limit=${limit}`);
  return res.data;
};

export const getPlayerById = async (id: number) => {
  const res = await api.get(`/players/${id}`);
  console.log(res.data);
  return res.data;
};

export const addPlayer = async (player: PlayerFormValues) => {
  try {
    const response = await api.post("/players", player);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const deletePlayer = async (id: number) => {
  const res = await api.delete(`/players/${id}`);
  console.log(res.data);
  return res.data;
};

export const updatePlayer = async (id: number, player: PlayerFormValues) => {
  const res = await api.put(`players/${id}`, player);
  console.log(res.data);
  return res.data;
};

export const getStartingXI = async () => {
  const res = await api.get("/startingXI");
  console.log(res);
  return res.data;
};

export const createStartingXI = async (payload: {
  slots: Record<string, number>;
}) => {
  try {
    const response = await api.post("/startingXI", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Please add all eleven players "
    );
  }
};
