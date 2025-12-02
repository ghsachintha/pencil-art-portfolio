"use client";

import { submitCommission } from "../app/actions";
import { useFormStatus } from "react-dom";
import { useState, useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-neutral-900 text-white py-3 px-6 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-serif tracking-wide"
    >
      {pending ? "Submitting Order..." : "Place Order"}
    </button>
  );
}

export default function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function clientAction(formData: FormData) {
    const result = await submitCommission(formData);
    if (result.success) {
      setSubmitted(true);
      setError(null);
      setFileName(null);
    } else {
      setError(result.error || "Something went wrong");
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-serif text-neutral-900 mb-4">
          Order Received
        </h2>
        <p className="text-neutral-600 mb-6">
          Thank you for your order. I have received your request and will review
          the details shortly. I will contact you via email with a quote and
          timeline.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-neutral-900 underline hover:text-neutral-700"
        >
          Place another order
        </button>
      </div>
    );
  }

  return (
    <form action={clientAction} className="space-y-6 text-left">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Your Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full border-b-2 border-neutral-200 bg-transparent py-2 px-1 focus:border-neutral-900 focus:outline-none transition-colors placeholder-neutral-400"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full border-b-2 border-neutral-200 bg-transparent py-2 px-1 focus:border-neutral-900 focus:outline-none transition-colors placeholder-neutral-400"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="size"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Preferred Size
        </label>
        <select
          name="size"
          id="size"
          required
          className="w-full border-b-2 border-neutral-200 bg-transparent py-2 px-1 focus:border-neutral-900 focus:outline-none transition-colors"
        >
          <option value="" disabled selected>
            Select a size
          </option>
          <option value="A4">A4 (8.3 x 11.7 in)</option>
          <option value="A3">A3 (11.7 x 16.5 in)</option>
          <option value="A2">A2 (16.5 x 23.4 in)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Reference Photo
        </label>
        <div
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md hover:border-neutral-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-900 hover:text-neutral-700">
                {fileName ? fileName : "Upload a file"}
              </span>
              <input
                id="photo"
                name="photo"
                type="file"
                className="sr-only"
                accept="image/*"
                required
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {!fileName && <p className="pl-1">or click to select</p>}
            </div>
            <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="details"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Additional Details
        </label>
        <textarea
          name="details"
          id="details"
          rows={4}
          className="w-full border-2 border-neutral-200 bg-transparent py-2 px-3 rounded-sm focus:border-neutral-900 focus:outline-none transition-colors placeholder-neutral-400"
          placeholder="Tell me about the subject, specific requests, or deadline..."
        />
      </div>

      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <SubmitButton />
    </form>
  );
}
