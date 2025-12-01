export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-primary">
        Get in Touch
      </h1>
      <p className="text-lg text-secondary">
        Interested in a commission or purchasing an original piece? I&apos;d
        love to hear from you.
      </p>

      <div className="p-8 bg-white border border-secondary/10 rounded-sm shadow-sm inline-block">
        <p className="text-secondary mb-2">Email me at</p>
        <a
          href="mailto:artist@example.com"
          className="text-2xl font-serif text-primary hover:underline"
        >
          artist@example.com
        </a>
      </div>

      <div className="flex justify-center gap-6 pt-8">
        {/* Social placeholders */}
        <span className="text-secondary/60">Instagram</span>
        <span className="text-secondary/60">Twitter</span>
      </div>
    </div>
  );
}
