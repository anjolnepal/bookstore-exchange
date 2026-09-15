'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 border border-line rounded-md
                       py-3 text-sm font-semibold text-ink bg-paper-white hover:bg-paper-2
                       transition-colors"
        >
          <FcGoogle className='text-[28px]' />
          Continue with Google
        </button>

        <button
          onClick={() => signIn('github', { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 border border-line rounded-md
                       py-3 text-sm font-semibold text-paper-white bg-black text-white hover:bg-spine
                       transition-colors"
        >
         <FaGithub className='text-[26px]' />
          Continue with GitHub
        </button>
      </div>

      <p className="text-xs text-muted mt-6">
        By continuing, you agree to use BookSwap for academic demo purposes
        only.
      </p>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="section wrap flex justify-center px-4 py-16">
      <div className="w-full max-w-[380px] bg-paper-white border border-line rounded-xl p-8">
        <h2 className="text-2xl mb-5">Log In</h2>

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="mb-4 text-sm text-danger bg-danger/10 border border-danger/30 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-white text-ink
                       focus:outline-none focus:ring-2 focus:ring-spine focus:border-spine"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-white text-ink
                       focus:outline-none focus:ring-2 focus:ring-spine focus:border-spine"
            />
          </div>

          <button          
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 bg-green-800 text-white hover:bg-spine
                     text-paper-white font-semibold text-sm rounded-md py-3 transition-colors
                     disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>

          <div className="text-center text-sm text-muted mt-4">
            Don&apos;t have an account?{' '}
            <Link
              href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
              className="text-spine font-semibold underline"
            >
            
              Register
            </Link>
          </div>
        </form>
        <br />
        <LoginContent/>
      </div>
    </div>
  );
}

// 4. Main exported component that handles the Suspense boundary properly
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="section wrap flex justify-center px-4 py-16 text-sm text-muted">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
