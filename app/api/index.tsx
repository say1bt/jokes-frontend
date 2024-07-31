import { Credentials, Joke, JokeDetails, JokeType } from "../types";
import { deliverJokeService, moderateJokeService, submitJokeService } from "./axiosInstances";

export const getJoke = () => deliverJokeService.get("jokes/random-joke");
export const getAllJokeTypes = () => deliverJokeService.get("jokes/joke-types");
export const submitApprovedJokes = (jokeDetails: JokeDetails) => deliverJokeService.post("jokes", jokeDetails);
export const submitJoke = (joke: Joke) => submitJokeService.post("/joke", joke);
export const authenticateUser = (credentials: Credentials) => moderateJokeService.post("/authenticate", credentials);
export const getAllJokes = () => moderateJokeService.get("/jokes");
export const addCategory = (category: JokeType) => moderateJokeService.post("/joke-type", category);
export const updateJokeContent = (content: Joke, jokeId: string) => moderateJokeService.put(`/joke/${jokeId}`, content);
export const deleteSubmittedJoke = (jokeId: string) => moderateJokeService.delete(`/joke/${jokeId}`);
export const rejectSubmitedJoke = (jokeId: string) => moderateJokeService.put(`/joke/${jokeId}/reject`);
export const approveSubmittedJoke = (jokeId: string) => moderateJokeService.put(`/joke/${jokeId}/approve`);
