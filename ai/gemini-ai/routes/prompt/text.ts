export default eventHandler(async (event) => {
  setResponseHeader(event, "Content-Type", "text/html");

  const query = getQuery(event);
  const { prompt = "Write a story about Bun bo Hue in VietNam" } = query;
  const model = generativeAI.getGenerativeModel({ model: geminiModelNames.pro });
  const result = await model.generateContentStream(prompt.toString());

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(encoder.encode(chunk.text()));
        await sleep(50);
      }
    },
  });
  return stream;
});
