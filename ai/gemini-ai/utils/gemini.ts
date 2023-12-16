import { GoogleGenerativeAI } from "@google/generative-ai";

const runtime = useRuntimeConfig();

export const generativeAI = new GoogleGenerativeAI(runtime.google.geminiApiKey);
