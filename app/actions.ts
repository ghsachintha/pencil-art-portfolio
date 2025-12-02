"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function submitCommission(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const size = formData.get("size") as string;
  const details = formData.get("details") as string;
  const photo = formData.get("photo") as File;

  if (!name || !email || !size || !photo) {
    throw new Error("Missing required fields");
  }

  try {
    // 1. Upload the image
    const imageAsset = await client.assets.upload("image", photo, {
      filename: photo.name,
    });

    // 2. Create the commission document
    await client.create({
      _type: "commission",
      customerName: name,
      email,
      drawingSize: size,
      details,
      referencePhoto: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
      status: "pending",
    });

    return { success: true };
  } catch (error) {
    console.error("Commission submission error:", error);
    return { success: false, error: "Failed to submit commission" };
  }
}
