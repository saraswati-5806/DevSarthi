import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// Initialize the S3 Client with your .env credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    // 1. Prepare the S3 Upload Command
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName, // The name the file will have in S3
      Body: buffer,
      ContentType: file.type,
    };

    // 2. Send the file to the "Vault" (S3)
    await s3Client.send(new PutObjectCommand(uploadParams));

    return NextResponse.json({ 
      success: true, 
      message: "Syllabus uploaded to the Vault!",
      fileName: fileName 
    });

  } catch (error) {
    console.error("S3 Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}