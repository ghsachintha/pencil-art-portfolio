export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-secondary/10">
      <div className="container text-center text-sm text-secondary/60">
        <p>
          &copy; {new Date().getFullYear()} Pencil Art. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
