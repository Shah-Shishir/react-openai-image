import { post } from "./axios";

export const generateImages = data => post(`openai/generate-images`, data);
