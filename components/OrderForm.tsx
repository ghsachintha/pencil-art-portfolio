"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import PayHereButton from "./PayHereButton";

type FormErrors = {
  name?: string[];
  email?: string[];
  size?: string[];
  details?: string[];
  photo?: string[];
  _form?: string[];
};

const PRICES = {
  A4: "5000",
  A3: "8000",
  A2: "12000",
};

export default function OrderForm() {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "payment_pending" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State for persistence
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    size: "",
    details: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (errors.photo) {
        setErrors((prev) => ({ ...prev, photo: undefined }));
      }
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("uploading");
    setUploadProgress(0);
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/order");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.success && response.orderId) {
            setOrderId(response.orderId);
            setStatus("payment_pending");
          } else {
            // Fallback
            setStatus("success");
            setFormData({ name: "", email: "", size: "", details: "" });
            setFileName(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }
        } catch (e) {
          setStatus("success");
        }
      } else {
        setStatus("error");
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.errors) {
            setErrors(response.errors);
          } else {
            setErrors({ _form: [response.message || "Something went wrong"] });
          }
        } catch (e) {
          setErrors({ _form: ["An unexpected error occurred"] });
        }
      }
    };

    xhr.onerror = () => {
      setStatus("error");
      setErrors({ _form: ["Network error. Please check your connection."] });
    };

    xhr.send(data);
  };

  if (status === "success") {
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
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setStatus("idle")}
            className="text-neutral-900 underline hover:text-neutral-700"
          >
            Place another order
          </button>
          <Link
            href="/"
            className="text-neutral-900 underline hover:text-neutral-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (status === "payment_pending") {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <h2 className="text-3xl font-serif text-neutral-900 mb-4">
          Order Details Saved
        </h2>
        <p className="text-neutral-600 mb-8">
          Your order has been saved. Please proceed with the payment to complete
          your order.
        </p>

        <div className="bg-neutral-50 p-6 rounded-lg mb-8 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Order ID:</span>
            <span className="font-mono text-sm">
              {orderId.slice(-8).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Size:</span>
            <span className="font-medium">{formData.size}</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-neutral-200">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">
              LKR {PRICES[formData.size as keyof typeof PRICES]}
            </span>
          </div>
        </div>

        <PayHereButton
          orderId={orderId}
          amount={PRICES[formData.size as keyof typeof PRICES]}
          customerName={formData.name}
          customerEmail={formData.email}
          items={`Pencil Portrait - ${formData.size}`}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
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
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full border-b-2 bg-transparent py-2 px-1 focus:outline-none transition-colors placeholder-neutral-400 ${
            errors.name
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-200 focus:border-neutral-900"
          }`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
        )}
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
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full border-b-2 bg-transparent py-2 px-1 focus:outline-none transition-colors placeholder-neutral-400 ${
            errors.email
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-200 focus:border-neutral-900"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
        )}
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
          value={formData.size}
          onChange={handleInputChange}
          className={`w-full border-b-2 bg-transparent py-2 px-1 focus:outline-none transition-colors ${
            errors.size
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-200 focus:border-neutral-900"
          }`}
        >
          <option value="" disabled>
            Select a size
          </option>
          <option value="A4">A4 (8.3 x 11.7 in)</option>
          <option value="A3">A3 (11.7 x 16.5 in)</option>
          <option value="A2">A2 (16.5 x 23.4 in)</option>
        </select>
        {errors.size && (
          <p className="text-red-500 text-xs mt-1">{errors.size[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Reference Photo
        </label>
        <div
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors cursor-pointer ${
            errors.photo
              ? "border-red-300 hover:border-red-400"
              : "border-neutral-300 hover:border-neutral-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-1 text-center">
            <svg
              className={`mx-auto h-12 w-12 ${
                errors.photo ? "text-red-400" : "text-neutral-400"
              }`}
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
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {!fileName && <p className="pl-1">or click to select</p>}
            </div>
            <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {errors.photo && (
          <p className="text-red-500 text-xs mt-1">{errors.photo[0]}</p>
        )}
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
          value={formData.details}
          onChange={handleInputChange}
          className="w-full border-2 border-neutral-200 bg-transparent py-2 px-3 rounded-sm focus:border-neutral-900 focus:outline-none transition-colors placeholder-neutral-400"
          placeholder="Tell me about the subject, specific requests, or deadline..."
        />
      </div>

      {errors._form && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
          {errors._form[0]}
        </div>
      )}

      {status === "uploading" && (
        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-neutral-900 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-xs text-center mt-1 text-neutral-600">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <Link
          href="/"
          className="w-1/3 text-center py-3 px-6 rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors font-serif tracking-wide"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={status === "uploading"}
          className="w-2/3 bg-neutral-900 text-white py-3 px-6 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-serif tracking-wide"
        >
          {status === "uploading" ? "Submitting..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}
