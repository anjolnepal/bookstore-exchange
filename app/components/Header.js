'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/exchange', label: 'Exchange' },
];

// TODO: replace with real session state once NextAuth is wired up (Days 8-10 milestone).
const loggedIn = false;
const cartCount = 0;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className="bg-spine text-white sticky top-0 z-40 border-b-[3px] border-spine-dark">
      <div className="max-w-[1120px] mx-auto px-6 py-3.5 flex items-center justify-between gap-5">
        <Link
          href="/"
          className="font-display font-bold text-xl flex items-center gap-2"
        >
          <span className="text-mustard">📖</span> BookSwap
        </Link>

        <nav className="hidden md:flex gap-7 text-sm font-medium">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#E7E1CE] hover:text-white pb-1 border-b-2 border-transparent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <Link
            href="/cart"
            className="relative text-base p-1"
            aria-label="Cart"
          >
            🛒
            <span className="absolute -top-1.5 -right-2 bg-mustard text-spine-dark text-[10px] font-bold font-mono rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {loggedIn ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="text-sm font-semibold flex items-center gap-1"
              >
                Jordan ▾
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] bg-white text-ink border border-line rounded-lg min-w-[190px] shadow-lg p-1.5 z-50">
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-sm rounded hover:bg-paper-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-3 py-2 text-sm rounded hover:bg-paper-2"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/account/listings"
                    className="block px-3 py-2 text-sm rounded hover:bg-paper-2"
                  >
                    My Listings
                  </Link>
                  <Link
                    href="/account/requests"
                    className="block px-3 py-2 text-sm rounded hover:bg-paper-2"
                  >
                    My Requests
                  </Link>
                  <Link
                    href="/account/profile"
                    className="block px-3 py-2 text-sm rounded hover:bg-paper-2"
                  >
                    Profile
                  </Link>
                  <hr className="my-1 border-line" />
                  <button className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-paper-2">
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-mustard text-spine-dark rounded-md px-3.5 py-2 text-sm font-semibold hover:bg-mustard-dark transition-colors"
            >
              Log In
            </Link>
          )}

          <button
            className="md:hidden text-2xl leading-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-spine-dark px-5 pb-4 pt-2 flex flex-col gap-0.5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#E7E1CE] py-2.5 text-sm border-b border-[#3A5545]"
            >
              {l.label}
            </Link>
          ))}
          {!loggedIn && (
            <>
              <Link
                href="/login"
                className="text-[#E7E1CE] py-2.5 text-sm border-b border-[#3A5545]"
              >
                Log In
              </Link>
              <Link href="/register" className="text-[#E7E1CE] py-2.5 text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
