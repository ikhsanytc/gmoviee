import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("files") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Buat direktori jika belum ada
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory:", err);
      return NextResponse.json({ status: "fail", error: err });
    }

    // Generate random filename
    const randomName = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.name);
    const randomFileName = `${randomName}${ext}`;

    const filePath = path.join(uploadDir, randomFileName);
    await fs.writeFile(filePath, buffer);

    revalidatePath("/");

    return NextResponse.json({ status: "success", fileName: randomFileName });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
