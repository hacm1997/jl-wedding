import { NextRequest, NextResponse } from "next/server";
import { Storage } from "megajs";

async function createStorage(email: string, password: string) {
  return await new Storage({ email, password }).ready;
}

async function getPrimaryStorage() {
  return createStorage(process.env.MEGA_EMAIL!, process.env.MEGA_PASSWORD!);
}

async function getSecondaryStorage() {
  return createStorage(
    process.env.MEGA_EMAIL_ALT!,
    process.env.MEGA_PASSWORD_ALT!
  );
}

/*async function getStorage() {
  const storage = await new Storage({
    email: process.env.MEGA_EMAIL!,
    password: process.env.MEGA_PASSWORD!,
  }).ready;

  return storage;
}*/

async function uploadFilesWithStorage(storage: any, files: File[]) {
  const results: any[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name;

    const megaFile = await storage.upload(fileName, buffer).complete;
    results.push({
      name: megaFile.name,
      size: megaFile.size,
      link: megaFile.link({ noKey: true }),
      account: storage.email, // opcional, para saber en cuál cuenta quedó
    });
  }

  return results;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    let storage = await getPrimaryStorage();

    try {
      // 1) intentar con la cuenta principal
      const results = await uploadFilesWithStorage(storage, files);
      return NextResponse.json({ files: results, usedAccount: "primary" });
    } catch (err: any) {
      const msg = String(err?.message ?? "").toLowerCase();

      // Si es error de cuota/almacenamiento, intentamos con la cuenta alternativa
      if (
        msg.includes("over quota") ||
        msg.includes("quotaexceeded") ||
        (msg.includes("storage") && msg.includes("quota"))
      ) {
        console.warn("Cuenta principal sin espacio, usando cuenta alternativa");

        const altStorage = await getSecondaryStorage();
        const altResults = await uploadFilesWithStorage(altStorage, files);

        return NextResponse.json({
          files: altResults,
          usedAccount: "secondary",
        });
      }

      // Otros errores → relanzar para que los capture el catch externo
      throw err;
    }
  } catch (err: any) {
    console.error("Error en upload MEGA:", err);
    return NextResponse.json(
      { error: err.message ?? "Upload error" },
      { status: 500 }
    );
  }
}
