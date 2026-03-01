import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { NextResponse } from "next/server";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { message, language } = await req.json();

    // The System Prompt: This is the secret sauce for your "Bharat-First" logic
    const prompt = `
      You are DevSathi, an expert AI tutor for students in India. 
      Your goal is to explain complex technical concepts simply. 
      Use relatable analogies from daily Indian life (e.g., local festivals, cricket, street food).
      Always respond in ${language}. 
      User question: ${message}
    `;

    const input = {
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    const resBody = JSON.parse(new TextDecoder().decode(response.body));

    return NextResponse.json({ text: resBody.content[0].text });
  } catch (error) {
    console.error("Bedrock Error:", error);
    return NextResponse.json({ error: "The AI is currently studying. Please try again later." }, { status: 500 });
  }
}