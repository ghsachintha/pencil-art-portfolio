import OrderForm from "@/components/OrderForm";

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[var(--color-primary)] mb-4">
            Order Art
          </h1>
          <p className="text-lg text-[var(--color-secondary)] max-w-xl mx-auto">
            Turn your favorite memories into timeless charcoal art. Please fill
            out the form below to place your order.
          </p>
        </div>

        <div className="bg-white p-8 shadow-xl rounded-sm border border-neutral-200">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
