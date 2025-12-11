import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Cursor />
      <Background />
      <NoiseOverlay />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
