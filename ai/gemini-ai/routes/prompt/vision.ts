export default eventHandler(async (event) => {
  setResponseHeader(event, "Content-Type", "text/html; charset=utf-8");

  const query = getQuery(event);
  const { prompt = "What's the different between 2 these pictures?" } = query;
  const model = generativeAI.getGenerativeModel({ model: geminiModelNames.proVision });
  const imageParts = [
    fileToGenerativePart("/images/bundaumamtom.webp", "image/webp"),
    fileToGenerativePart("/images/bunbohue.webp", "image/webp"),
  ];
  const result = await model.generateContentStream([prompt.toString(), ...imageParts]);

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
