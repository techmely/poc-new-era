import fs from "fs";

type MineType = "image/jpeg" | "image/png" | "image/webp" | "image/heic";

const filesRoot = `${process.cwd()}/files`;

export function fileToGenerativePart(path: string, mimeType: MineType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filesRoot + path)).toString("base64"),
      mimeType,
    },
  };
}
