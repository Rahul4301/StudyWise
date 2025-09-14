import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { Buffer } from "buffer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let text = "";

    if (file.type === "application/pdf") {
      // dynamic import avoids test files issue
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (file.type === "text/plain") {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }

    // Instead of saving to Supabase, just return a placeholder response
    return NextResponse.json({
      documentId: "fake-doc-id-123",
      name: file.name,
      content: text,
    });
  } catch (error: any) {
    console.error("Error parsing file in API route:", error);
    return NextResponse.json(
      { error: "Failed to parse the file." },
      { status: 500 }
    );
  }
}
