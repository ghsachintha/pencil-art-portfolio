"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generatePayHereHash } from "@/app/actions";

interface PayHereButtonProps {
  orderId: string;
  amount: string;
  customerName: string;
  customerEmail: string;
  items: string;
}

export default function PayHereButton({
  orderId,
  amount,
  customerName,
  customerEmail,
  items,
}: PayHereButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);

    try {
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
        sandbox: true, // TODO: Make this configurable if needed, or rely on merchant ID
        merchant_id: merchantId,
        return_url: `${window.location.origin}/order/success`,
        cancel_url: `${window.location.origin}/order`,
        notify_url: `${window.location.origin}/api/payhere/notify`, // We need to implement this later
        order_id: orderId,
        items: items,
        amount: parseFloat(amount).toFixed(2),
        currency: "LKR",
        hash: hash,
        first_name: customerName.split(" ")[0],
        last_name: customerName.split(" ").slice(1).join(" ") || "",
        email: customerEmail,
        phone: "",
        address: "",
        city: "",
        country: "Sri Lanka",
      };

      if (window.payhere) {
        window.payhere.startPayment(paymentObject);
        // We don't stop loading here because the popup opens
        // But if the user closes it, we might want to reset loading.
        // PayHere has callbacks: onDismissed
        window.payhere.onDismissed = function onDismissed() {
          setIsLoading(false);
        };
        window.payhere.onError = function onError(error: any) {
          console.error("PayHere Error:", error);
          setIsLoading(false);
          alert("Payment failed. Please try again.");
        };
      } else {
        console.error("PayHere SDK not loaded");
        alert("Payment system is not ready. Please try again later.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to start payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-neutral-900 text-white py-3 px-6 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-serif tracking-wide flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
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
        "Pay Now"
      )}
    </button>
  );
}
