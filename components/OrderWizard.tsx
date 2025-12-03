"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { generatePayHereHash } from "@/app/actions";

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

export default function OrderWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "processing_payment" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      if (errors.photo) {
        setErrors((prev) => ({ ...prev, photo: undefined }));
      }
    } else {
      setFileName(null);
      setFile(null);
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = ["Name is required"];
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = ["Email is required"];
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = ["Invalid email format"];
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.size) {
        newErrors.size = ["Size is required"];
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!fileName) {
        newErrors.photo = ["Reference photo is required"];
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePayment = async () => {
    setStatus("uploading");
    setUploadProgress(0);
    setErrors({});

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("size", formData.size);
    data.append("details", formData.details);
    if (file) {
      data.append("photo", file);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/order");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.success && response.orderId) {
            // Order saved, now initiate payment
            setStatus("processing_payment");
            await initiatePayHere(response.orderId);
          } else {
            // Fallback if no orderId (shouldn't happen with correct API)
            setStatus("success");
          }
        } catch {
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
        } catch {
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

  const initiatePayHere = async (orderId: string) => {
    try {
      const amount = PRICES[formData.size as keyof typeof PRICES];
      const { hash, merchantId, isProduction } = await generatePayHereHash(
        orderId,
        amount
      );

      if (!isProduction) {
        // Simulation Mode
        console.log("Simulation Mode: Payment started...");
        setTimeout(() => {
          console.log("Simulation Mode: Payment success!");
          router.push("/order/success");
        }, 2000);
        return;
      }

      // Real Payment Mode
      const paymentObject = {
        sandbox: true,
        merchant_id: merchantId,
        return_url: `${window.location.origin}/order/success`,
        cancel_url: `${window.location.origin}/order`,
        notify_url: `${window.location.origin}/api/payhere/notify`,
        order_id: orderId,
        items: `Pencil Portrait - ${formData.size}`,
        amount: parseFloat(amount).toFixed(2),
        currency: "LKR",
        hash: hash,
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" ") || "",
        email: formData.email,
        phone: "",
        address: "",
        city: "",
        country: "Sri Lanka",
      };

      if (window.payhere) {
        window.payhere.startPayment(paymentObject);

        window.payhere.onDismissed = function onDismissed() {
          setStatus("idle"); // Reset status if dismissed so user can try again
        };
        window.payhere.onError = function onError(error: unknown) {
          console.error("PayHere Error:", error);
          setStatus("error");
          setErrors({ _form: ["Payment failed. Please try again."] });
        };
      } else {
        console.error("PayHere SDK not loaded");
        setStatus("error");
        setErrors({ _form: ["Payment system is not ready. Please reload."] });
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      setStatus("error");
      setErrors({ _form: ["Failed to start payment. Please try again."] });
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-serif text-main mb-4">Order Received</h2>
        <p className="text-muted mb-6">
          Thank you for your order. I have received your request and will review
          the details shortly.
        </p>
        <Link href="/" className="text-main underline hover:text-muted">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto min-h-[400px] flex flex-col">
      <Script
        src="https://www.payhere.lk/lib/payhere.js"
        strategy="lazyOnload"
      />

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              step === i ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-4">Contact Info</h2>
                <div>
                  <label className="block text-sm font-medium text-main mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border-b-2 bg-transparent py-2 px-1 focus:outline-none ${
                      errors.name
                        ? "border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name[0]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-main mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border-b-2 bg-transparent py-2 px-1 focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-4">Order Details</h2>
                <div>
                  <label className="block text-sm font-medium text-main mb-1">
                    Preferred Size
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className={`w-full border-b-2 bg-transparent py-2 px-1 focus:outline-none ${
                      errors.size
                        ? "border-red-500"
                        : "border-border focus:border-primary"
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.size[0]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-main mb-1">
                    Additional Details
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleInputChange}
                    className="w-full border-2 border-border bg-transparent py-2 px-3 rounded-sm focus:border-primary focus:outline-none"
                    placeholder="Tell me about the subject..."
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-4">Reference Photo</h2>
                <div
                  className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer ${
                    errors.photo
                      ? "border-red-300"
                      : "border-strong hover:border-primary"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-muted"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-sm text-muted">
                      <span className="font-medium text-main">
                        {fileName ? fileName : "Upload a file"}
                      </span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="text-xs text-muted">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-xs mt-1">{errors.photo[0]}</p>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-4">Review Order</h2>
                <div className="bg-surface-highlight p-4 rounded-sm space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span> {formData.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {formData.email}
                  </p>
                  <p>
                    <span className="font-semibold">Size:</span> {formData.size}
                  </p>
                  <p>
                    <span className="font-semibold">Details:</span>{" "}
                    {formData.details || "None"}
                  </p>
                  <p>
                    <span className="font-semibold">File:</span> {fileName}
                  </p>
                  <p className="pt-2 border-t border-border mt-2">
                    <span className="font-bold text-lg">Total:</span>{" "}
                    <span className="font-bold text-lg">
                      LKR {PRICES[formData.size as keyof typeof PRICES]}
                    </span>
                  </p>
                </div>
                <p className="text-xs text-muted">
                  By clicking &quot;Place Order&quot;, you agree to the pricing
                  and terms.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-4 border-t border-border">
        {step > 1 ? (
          <button
            onClick={prevStep}
            disabled={status === "uploading" || status === "processing_payment"}
            className="px-6 py-2 text-muted hover:text-main transition-colors disabled:opacity-50"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <button
            onClick={nextStep}
            className="bg-primary text-[var(--color-text-inverted)] px-8 py-2 rounded-sm hover:opacity-90 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handlePayment}
            disabled={status === "uploading" || status === "processing_payment"}
            className="bg-primary text-[var(--color-text-inverted)] px-8 py-2 rounded-sm hover:opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {status === "uploading" || status === "processing_payment" ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-[var(--color-text-inverted)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        )}
      </div>

      {status === "uploading" && (
        <div className="w-full bg-border rounded-full h-1 mt-4">
          <div
            className="bg-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {errors._form && (
        <p className="text-red-500 text-sm text-center mt-4">
          {errors._form[0]}
        </p>
      )}
    </div>
  );
}
