import Footer from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex-1">
      <NavBar />
      <div className="container mx-auto mt-16 px-4 pt-16 sm:px-6 lg:px-8">
        {children}
        <Footer />
      </div>
    </main>
  );
}
