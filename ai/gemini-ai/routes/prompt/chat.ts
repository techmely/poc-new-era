import type { InputContent } from "@google/generative-ai";

const storageKey = "historyChat/techmely";

export default eventHandler(async (event) => {
  setResponseHeader(event, "Content-Type", "text/html;charset=utf-8");

  const query = getQuery(event);
  const storage = useStorage("db");
  const prompt = query.prompt as string;

  const model = generativeAI.getGenerativeModel({ model: geminiModelNames.pro });
  const currentHistories = (await storage.getItem<InputContent[]>(storageKey)) || [];

  const chat = model.startChat({ history: currentHistories });

  const result = await chat.sendMessage(prompt);
  const msg = result.response.text();
  currentHistories.push({ role: "user", parts: prompt }, { role: "model", parts: msg });
  await storage.setItem(storageKey, currentHistories);

  return msg;
});
