import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
import * as path from "path";

const envPath = path.join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const token: string | undefined = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("GITHUB_TOKEN is not set in environment variables");
}
const endpoint = "https://models.github.ai/inference";
const model = "xai/grok-3";

export async function main(e: string) {
  const client = ModelClient(endpoint, new AzureKeyCredential(token as string));
  const prompt = `return a funny remark for the attached error , just a single line mocking the person who got it, no quotes just a plain text line ERROR : ${e}`;
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt },
      ],
      temperature: 1,
      top_p: 1,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  // console.log(prompt);
  // console.log(response.body.choices[0].message.content);
  const r = response.body.choices[0].message.content as string;
  return r;
}
