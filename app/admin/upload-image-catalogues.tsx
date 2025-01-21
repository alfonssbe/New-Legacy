"use server"
import fs from "node:fs/promises";
import path from "path";

export async function uploadImageCatalogues(formData: FormData) {
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  // Create a unique filename to avoid collisions
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", "productimagecatalogues", filename);

  // Write the file to the specified path
  await fs.writeFile(filePath, buffer);

  // Return the URL for the uploaded file
  const fileUrl = `/uploads/productimagecatalogues/${filename}`;
  return fileUrl;
}