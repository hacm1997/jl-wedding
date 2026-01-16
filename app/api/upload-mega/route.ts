import { NextRequest, NextResponse } from "next/server";
import { Storage } from "megajs";

async function getStorage() {
  const storage = await new Storage({
    email: process.env.MEGA_EMAIL!,
    password: process.env.MEGA_PASSWORD!,
  }).ready;

  return storage;
}

export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const files = formData.getAll("files") as File[]; // Obtener todas [web:47]
  
      if (files.length === 0) {
        return NextResponse.json({ error: "No files" }, { status: 400 });
      }
  
      const storage = await getStorage();
      const results: any[] = [];
  
      // Subir cada archivo en paralelo
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = file.name;
  
        const megaFile = await storage.upload(fileName, buffer).complete;
        results.push({
          name: megaFile.name,
          size: megaFile.size,
          link: megaFile.link({noKey: true}),
        });
      }
  
      return NextResponse.json({ files: results });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
