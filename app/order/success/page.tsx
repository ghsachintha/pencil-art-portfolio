import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-sm border border-neutral-200 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-serif text-neutral-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-neutral-600 mb-8">
          Thank you for your payment. Your order has been confirmed and I will
          start working on your artwork soon. You will receive a confirmation
          email shortly.
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-neutral-900 text-white py-3 px-6 rounded-md hover:bg-neutral-800 transition-colors font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
