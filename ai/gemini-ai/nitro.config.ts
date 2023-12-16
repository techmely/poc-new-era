export default defineNitroConfig({
  preset: "vercel",
  timing: true,
  runtimeConfig: {
    google: {
      geminiApiKey: process.env.GOOGLE_GEMINI_AI_KEY,
    },
  },
  storage: {
    db: {
      driver: "fs",
      base: "./files/db",
    },
  },
});
