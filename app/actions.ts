"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { z } from "zod";
import crypto from "node:crypto";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const commissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  size: z.enum(["A4", "A3", "A2"] as const, {
    message: "Please select a valid size",
  }),
  details: z.string().optional(),
  photo: z
    .instanceof(File, { message: "Reference photo is required" })
    .refine((file) => file.size > 0, "Reference photo is required")
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file.type
        ),
      "Only .jpg, .png, .gif, and .webp formats are supported"
    ),
});

export type CommissionState = {
  success?: boolean;
  orderId?: string; // Added orderId
  errors?: {
    name?: string[];
    email?: string[];
    size?: string[];
    details?: string[];
    photo?: string[];
    _form?: string[];
  };
  message?: string;
  inputs?: {
    name: string;
    email: string;
    size: string;
    details: string;
  };
};

export async function submitCommission(
  prevState: CommissionState,
  formData: FormData
): Promise<CommissionState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    size: formData.get("size"),
    details: formData.get("details"),
    photo: formData.get("photo"),
  };

  // Validate fields
  const validatedFields = commissionSchema.safeParse(rawData);

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
      inputs: {
        name: rawData.name as string,
        email: rawData.email as string,
        size: rawData.size as string,
        details: rawData.details as string,
      },
    };
  }

  const { name, email, size, details, photo } = validatedFields.data;

  try {
    // 1. Upload the image
    const imageAsset = await client.assets.upload("image", photo, {
      filename: photo.name,
    });

    // 2. Create the commission document
    const doc = await client.create({
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
      status: "pending_payment", // Changed status
    });

    return {
      success: true,
      orderId: doc._id, // Return the ID
      message: "Order details saved. Please proceed to payment.",
    };
  } catch (error) {
    console.error("Commission submission error:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to submit commission. Please try again later."],
      },
      message: "Failed to submit request.",
      inputs: {
        name,
        email,
        size,
        details: details || "",
      },
    };
  }
}

export async function generatePayHereHash(orderId: string, amount: string) {
  const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET; // Ensure this is in .env

  // Simulation Mode
  if (!merchantId || merchantId === "TEST") {
    return {
      hash: "dev_hash_123",
      merchantId: "TEST",
      isProduction: false,
    };
  }

  if (!merchantSecret) {
    throw new Error("PAYHERE_MERCHANT_SECRET is not set");
  }

  // Real Hash Generation
  // Hash = strtoupper(md5(merchant_id + order_id + amount + currency + strtoupper(md5(merchant_secret))))
  const currency = "LKR"; // Assuming LKR for now

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const amountFormatted = parseFloat(amount).toFixed(2); // Ensure 2 decimal places

  const hashString =
    merchantId + orderId + amountFormatted + currency + hashedSecret;

  const hash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  return {
    hash,
    merchantId,
    isProduction: true,
  };
}

export async function submitContactForm(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  // TODO: Integrate with actual email service (e.g., Resend, SendGrid)
  console.log("Contact Form Submission:", { name, email, subject, message });

  return { success: true };
}
