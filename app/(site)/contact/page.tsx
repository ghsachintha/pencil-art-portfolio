import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Pencil Art Portfolio",
  description:
    "Get in touch for commissions, collaborations, or just to say hello.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Interested in a commission or have a question? Fill out the form
            below and I&apos;ll get back to you shortly.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-sm shadow-sm border border-neutral-100 dark:border-neutral-800">
          <ContactForm />
        </div>

        <div className="mt-16 text-center text-secondary text-sm">
          <p>Prefer email?</p>
          <a
            href="mailto:hello@pencilart.com"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            hello@pencilart.com
          </a>
        </div>
      </div>
    </main>
  );
}
