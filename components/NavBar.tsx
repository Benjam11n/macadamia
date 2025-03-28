'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ROUTES } from '@/constants/routes';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo and brand name */}
        <div className="flex items-center">
          <Link
            href={ROUTES.HOME}
            prefetch
            className="flex items-center space-x-2"
          >
            <Logo className="size-10" />
            <span className="inline-block text-2xl font-bold">Macadamia</span>
          </Link>
        </div>

        {/* Auth buttons and theme toggle */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
