import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NextResponse } from "next/server";
import { z } from "zod";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  size: z.enum(["A4", "A3", "A2"] as const, {
    message: "Please select a valid size",
  }),
  details: z.string().optional(),
  // File validation happens manually on the FormData entry
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const size = formData.get("size") as string;
    const details = formData.get("details") as string;
    const photo = formData.get("photo") as File;

    // Validate fields
    const validatedFields = orderSchema.safeParse({
      name,
      email,
      size,
      details,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Please fix the errors below.",
        },
        { status: 400 }
      );
    }

    // Validate photo
    if (!photo || photo.size === 0) {
      return NextResponse.json(
        {
          success: false,
          errors: { photo: ["Reference photo is required"] },
          message: "Reference photo is required",
        },
        { status: 400 }
      );
    }

    if (photo.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          errors: { photo: ["File size must be less than 10MB"] },
          message: "File size must be less than 10MB",
        },
        { status: 400 }
      );
    }

    if (
      !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        photo.type
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            photo: ["Only .jpg, .png, .gif, and .webp formats are supported"],
          },
          message: "Invalid file format",
        },
        { status: 400 }
      );
    }

    // 1. Upload the image
    // Note: Sanity client doesn't support progress events directly in Node.js environment easily without streams,
    // but the client-side upload to THIS route will be tracked.
    const imageAsset = await client.assets.upload("image", photo, {
      filename: photo.name,
    });

    // 2. Create the order document
    const doc = await client.create({
      _type: "order",
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
      status: "pending_payment",
    });

    return NextResponse.json({
      success: true,
      orderId: doc._id,
      message: "Order submitted successfully!",
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit order. Please try again later.",
      },
      { status: 500 }
    );
  }
}
